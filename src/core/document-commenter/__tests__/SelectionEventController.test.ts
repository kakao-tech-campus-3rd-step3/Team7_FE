import { describe, test, expect, vitest } from "vitest";

import { EventBus } from "@/core/document-commenter/events/EventBus";
import { SelectionEventController } from "@/core/document-commenter/events/SelectionEventController";

describe("SelectionEventController", () => {
    test("마우스 이벤트에 따라 상태가 전이된다", () => {
        const selectionEventController = new SelectionEventController();
        const eventBus = new EventBus().use(selectionEventController);

        expect(selectionEventController.state).toBe("idle");

        eventBus.dispatch({
            type: "document:mousedown",
            payload: { x: 10, y: 10 },
        });

        expect(selectionEventController.state).toBe("dragging");

        eventBus.dispatch({
            type: "document:mousemove",
            payload: { x: 20, y: 20 },
        });

        expect(selectionEventController.state).toBe("dragging");

        eventBus.dispatch({
            type: "document:mouseup",
            payload: { x: 30, y: 30 },
        });

        expect(selectionEventController.state).toBe("idle");
    });

    test("선택 이벤트가 올바르게 디스패치된다", () => {
        const selectionEventController = new SelectionEventController();
        const eventBus = new EventBus().use(selectionEventController);

        const selectionStartHandler = vitest.fn();
        const selectionMoveHandler = vitest.fn();
        const selectionEndHandler = vitest.fn();

        eventBus.subscribe("selection:start", selectionStartHandler);
        eventBus.subscribe("selection:move", selectionMoveHandler);
        eventBus.subscribe("selection:end", selectionEndHandler);

        eventBus.dispatch({
            type: "document:mousedown",
            payload: { x: 10, y: 10 },
        });

        expect(selectionStartHandler).toHaveBeenCalledWith({
            type: "selection:start",
            payload: { x: 10, y: 10 },
        });

        eventBus.dispatch({
            type: "document:mousemove",
            payload: { x: 20, y: 20 },
        });

        expect(selectionEndHandler).not.toHaveBeenCalled();
        expect(selectionMoveHandler).toHaveBeenCalledWith({
            type: "selection:move",
            payload: { start: { x: 10, y: 10 }, current: { x: 20, y: 20 } },
        });

        eventBus.dispatch({
            type: "document:mouseup",
            payload: { x: 30, y: 30 },
        });

        expect(selectionEndHandler).toHaveBeenCalledWith({
            type: "selection:end",
            payload: { start: { x: 10, y: 10 }, end: { x: 30, y: 30 } },
        });
    });

    test("idle 상태에서는 mousemove와 mouseup 이벤트를 무시한다", () => {
        const selectionEventController = new SelectionEventController();
        const eventBus = new EventBus().use(selectionEventController);
        const moveHandler = vitest.fn();
        const endHandler = vitest.fn();

        eventBus.subscribe("selection:move", moveHandler);
        eventBus.subscribe("selection:end", endHandler);

        eventBus.dispatch({ type: "document:mousemove", payload: { x: 20, y: 20 } });
        eventBus.dispatch({ type: "document:mouseup", payload: { x: 30, y: 30 } });

        expect(selectionEventController.state).toBe("idle");

        expect(moveHandler).not.toHaveBeenCalled();
        expect(endHandler).not.toHaveBeenCalled();
    });

    test("dragging 상태에서는 mousedown 이벤트를 무시한다", () => {
        const selectionEventController = new SelectionEventController();
        const eventBus = new EventBus().use(selectionEventController);
        const startHandler = vitest.fn();

        eventBus.subscribe("selection:start", startHandler);

        eventBus.dispatch({ type: "document:mousedown", payload: { x: 10, y: 10 } });

        eventBus.dispatch({ type: "document:mousedown", payload: { x: 50, y: 50 } });

        expect(selectionEventController.state).toBe("dragging");
        expect(selectionEventController.startPosition).toEqual({ x: 10, y: 10 });
        expect(startHandler).toHaveBeenCalledTimes(1);
    });
});
