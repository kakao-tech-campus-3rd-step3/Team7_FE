import { describe, test, expect, vitest } from "vitest";

import { EventBus } from "@/core/document-commenter/events/EventBus";

describe("EventBus", () => {
    const TEST_EVENT_KEY = "test:event";

    test("subscribe() 가 호출되면 listeners 에 핸들러가 등록된다", () => {
        const eventBus = new EventBus();

        const eventHandler = vitest.fn();

        expect(eventBus.listeners.get(TEST_EVENT_KEY)).toBeUndefined();
        eventBus.subscribe(TEST_EVENT_KEY, eventHandler);

        expect(eventBus.listeners.get(TEST_EVENT_KEY)).toContain(eventHandler);
    });

    test("unsubscribe() 가 호출되면 listeners 에서 핸들러가 제거된다", () => {
        const eventBus = new EventBus();

        const eventHandler = vitest.fn();
        eventBus.subscribe(TEST_EVENT_KEY, eventHandler);
        expect(eventBus.listeners.get(TEST_EVENT_KEY)).toContain(eventHandler);

        eventBus.unsubscribe(TEST_EVENT_KEY, eventHandler);
        expect(eventBus.listeners.get(TEST_EVENT_KEY)).not.toContain(eventHandler);
    });

    test("dispatch() 이 호출되면 listeners 에 등록된 핸들러가 호출된다", () => {
        const eventBus = new EventBus();

        const eventHandler = vitest.fn();
        eventBus.subscribe(TEST_EVENT_KEY, eventHandler);

        eventBus.dispatch({
            type: TEST_EVENT_KEY,
            payload: { message: "Test Message" },
        });

        expect(eventHandler).toHaveBeenCalledWith({
            type: TEST_EVENT_KEY,
            payload: { message: "Test Message" },
        });
    });

    test("use() 가 호출되면 EventController 가 attach 된다", () => {
        const eventBus = new EventBus();

        const mockEventController = {
            attach: vitest.fn(),
        };

        eventBus.use(mockEventController);

        expect(mockEventController.attach).toHaveBeenCalledWith(eventBus);
    });
});
