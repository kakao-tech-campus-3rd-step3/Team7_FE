import { EventBus } from "@/core/document-commenter/events/EventBus";
import { EventController } from "@/core/document-commenter/events/EventController";
import type { EventHandlerOf } from "@/core/document-commenter/events/EventTypes";

export type SelectionState = "idle" | "dragging";

export class SelectionEventController extends EventController {
    private eventBus: Nullable<EventBus> = null;

    public state: SelectionState = "idle";
    public startPosition: Vector2d = { x: 0, y: 0 };

    constructor() {
        super();
        this.initialize();
    }

    public override attach(eventBus: EventBus): void {
        this.eventBus = eventBus;

        this.eventBus.subscribe("document:mousedown", this.handleMouseDown);
        this.eventBus.subscribe("document:mousemove", this.handleMouseMove);
        this.eventBus.subscribe("document:mouseup", this.handleMouseUp);
    }

    public override detach(): void {
        this.eventBus?.unsubscribe("document:mousedown", this.handleMouseDown);
        this.eventBus?.unsubscribe("document:mousemove", this.handleMouseMove);
        this.eventBus?.unsubscribe("document:mouseup", this.handleMouseUp);
        this.initialize();
    }

    private initialize() {
        this.state = "idle";
        this.startPosition = { x: 0, y: 0 };
        this.eventBus = null;
    }

    private handleMouseDown: EventHandlerOf<"document:mousedown"> = (event) => {
        if (this.state !== "idle") return;

        this.state = "dragging";
        this.startPosition = event.payload;

        this.eventBus?.dispatch({
            type: "selection:start",
            payload: this.startPosition,
        });
    };

    private handleMouseMove: EventHandlerOf<"document:mousemove"> = (event) => {
        if (this.state !== "dragging") return;

        this.eventBus?.dispatch({
            type: "selection:move",
            payload: { start: this.startPosition, current: event.payload },
        });
    };

    private handleMouseUp: EventHandlerOf<"document:mouseup"> = (event) => {
        if (this.state !== "dragging") return;

        this.state = "idle";

        this.eventBus?.dispatch({
            type: "selection:end",
            payload: { start: this.startPosition, end: event.payload },
        });
    };
}
