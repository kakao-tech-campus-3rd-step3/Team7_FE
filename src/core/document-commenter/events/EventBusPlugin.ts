import type { EventBus } from "@/core/document-commenter/events/EventBus";

export abstract class EventBusPlugin {
    public abstract install(eventBus: EventBus): void;
    public abstract uninstall(): void;
}
