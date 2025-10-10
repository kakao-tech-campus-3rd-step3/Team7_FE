import { describe, test, expect, vitest, beforeEach, afterEach } from "vitest";

import { EventBus } from "@/core/document-commenter/events/EventBus";
import { SelectionEventPlugin } from "@/core/document-commenter/plugins/SelectionEventPlugin";

describe("selectionEventPlugin", () => {
    test("마우스 이벤트에 따라 상태가 전이된다", () => {
        const selectionEventPlugin = new SelectionEventPlugin();
        const eventBus = new EventBus().use(selectionEventPlugin);

        expect(selectionEventPlugin.state).toBe("idle");

        eventBus.dispatch({
            type: "raw:mousedown",
            payload: { x: 10, y: 10 },
        });

        expect(selectionEventPlugin.state).toBe("dragging");

        eventBus.dispatch({
            type: "raw:mousemove",
            payload: { x: 20, y: 20 },
        });

        expect(selectionEventPlugin.state).toBe("dragging");

        eventBus.dispatch({
            type: "raw:mouseup",
            payload: { x: 30, y: 30 },
        });

        expect(selectionEventPlugin.state).toBe("idle");
    });

    test("idle 상태에서는 mousemove와 mouseup 이벤트를 무시한다", () => {
        const selectionEventPlugin = new SelectionEventPlugin();
        const eventBus = new EventBus().use(selectionEventPlugin);
        const moveHandler = vitest.fn();
        const endHandler = vitest.fn();

        eventBus.subscribe("selection:move", moveHandler);
        eventBus.subscribe("selection:end", endHandler);

        eventBus.dispatch({ type: "raw:mousemove", payload: { x: 20, y: 20 } });
        eventBus.dispatch({ type: "raw:mouseup", payload: { x: 30, y: 30 } });

        expect(selectionEventPlugin.state).toBe("idle");

        expect(moveHandler).not.toHaveBeenCalled();
        expect(endHandler).not.toHaveBeenCalled();
    });

    test("dragging 상태에서는 mousedown 이벤트를 무시한다", () => {
        const selectionEventPlugin = new SelectionEventPlugin();
        const eventBus = new EventBus().use(selectionEventPlugin);
        const startHandler = vitest.fn();

        eventBus.subscribe("selection:start", startHandler);

        eventBus.dispatch({ type: "raw:mousedown", payload: { x: 10, y: 10 } });

        eventBus.dispatch({ type: "raw:mousedown", payload: { x: 50, y: 50 } });

        expect(selectionEventPlugin.state).toBe("dragging");
        expect(selectionEventPlugin.startPosition).toEqual({ x: 10, y: 10 });
        expect(startHandler).toHaveBeenCalledTimes(1);
    });
});

describe("raw:mousedown, raw:mouseup 이벤트 페이로드 값에 따라 selection:end 이벤트가 올바르게 디스패치된다", () => {
    let selectionEventPlugin: SelectionEventPlugin;
    let eventBus: EventBus;

    const selectionStartHandler = vitest.fn();
    const selectionMoveHandler = vitest.fn();
    const selectionEndHandler = vitest.fn();

    beforeEach(() => {
        selectionEventPlugin = new SelectionEventPlugin();
        eventBus = new EventBus().use(selectionEventPlugin);

        eventBus.subscribe("selection:start", selectionStartHandler);
        eventBus.subscribe("selection:move", selectionMoveHandler);
        eventBus.subscribe("selection:end", selectionEndHandler);
    });

    afterEach(() => {
        eventBus.unsubscribe("selection:start", selectionStartHandler);
        eventBus.unsubscribe("selection:move", selectionMoveHandler);
        eventBus.unsubscribe("selection:end", selectionEndHandler);
        vitest.clearAllMocks();
    });

    test("좌상단 드래그: start.x > end.x 이고 start.y > end.y 인 경우 selection:end 는 (end.x, end.y) 와 (start.x, start.y) 좌표를 가진다", () => {
        eventBus.dispatch({
            type: "raw:mousedown",
            payload: { x: 100, y: 100 },
        });

        eventBus.dispatch({
            type: "raw:mouseup",
            payload: { x: 50, y: 50 },
        });

        expect(selectionEndHandler).toHaveBeenCalledWith({
            type: "selection:end",
            payload: { start: { x: 50, y: 50 }, end: { x: 100, y: 100 } },
        });
    });

    test("좌하단 드래그: start.x > end.x 이고 start.y < end.y 인 경우 selection:end 는 (end.x, start.y) 와 (start.x, end.y) 좌표를 가진다", () => {
        eventBus.dispatch({
            type: "raw:mousedown",
            payload: { x: 100, y: 100 },
        });

        eventBus.dispatch({
            type: "raw:mouseup",
            payload: { x: 50, y: 150 },
        });

        expect(selectionEndHandler).toHaveBeenCalledWith({
            type: "selection:end",
            payload: { start: { x: 50, y: 100 }, end: { x: 100, y: 150 } },
        });
    });

    test("우상단 드래그: start.x < end.x 이고 start.y > end.y 인 경우 selection:end 는 (start.x, end.y) 와 (end.x, start.y) 좌표를 가진다", () => {
        eventBus.dispatch({
            type: "raw:mousedown",
            payload: { x: 100, y: 100 },
        });

        eventBus.dispatch({
            type: "raw:mouseup",
            payload: { x: 150, y: 50 },
        });

        expect(selectionEndHandler).toHaveBeenCalledWith({
            type: "selection:end",
            payload: { start: { x: 100, y: 50 }, end: { x: 150, y: 100 } },
        });
    });

    test("우하단 드래그: start.x < end.x 이고 start.y < end.y 인 경우 selection:end 는 (start.x, start.y) 와 (end.x, end.y) 좌표를 가진다", () => {
        eventBus.dispatch({
            type: "raw:mousedown",
            payload: { x: 100, y: 100 },
        });

        eventBus.dispatch({
            type: "raw:mouseup",
            payload: { x: 150, y: 150 },
        });

        expect(selectionEndHandler).toHaveBeenCalledWith({
            type: "selection:end",
            payload: { start: { x: 100, y: 100 }, end: { x: 150, y: 150 } },
        });
    });
});
