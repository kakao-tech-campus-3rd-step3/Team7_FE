import type { EventBus } from "@/core/document-commenter/events/EventBus";

export abstract class EventController {
    public abstract attach(eventBus: EventBus): void;

    public abstract detach(): void;
}
