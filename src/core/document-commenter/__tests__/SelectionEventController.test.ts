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
});
