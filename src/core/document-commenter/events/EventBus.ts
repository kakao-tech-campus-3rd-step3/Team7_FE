import type { EventController } from "@/core/document-commenter/events/EventController";
import type {
    EventHandlerOf,
    EventTypeOf,
    EventTypes,
} from "@/core/document-commenter/events/EventTypes";

export class EventBus {
    public listeners = new Map<keyof EventTypes, Array<EventHandlerOf<keyof EventTypes>>>();

    public subscribe<K extends keyof EventTypes>(eventType: K, handler: EventHandlerOf<K>) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)?.push(handler as EventHandlerOf<keyof EventTypes>);
    }

    public unsubscribe<K extends keyof EventTypes>(eventType: K, handler: EventHandlerOf<K>) {
        const handlers = this.listeners.get(eventType);
        if (handlers) {
            this.listeners.set(
                eventType,
                handlers.filter((h) => h !== handler),
            );
        }
    }

    public dispatch(event: EventTypeOf<keyof EventTypes>) {
        const handlers = this.listeners.get(event.type);
        if (handlers) {
            handlers.forEach((handler) => handler(event));
        }
    }

    public use(eventController: EventController) {
        eventController.attach(this);
        return this;
    }
}
