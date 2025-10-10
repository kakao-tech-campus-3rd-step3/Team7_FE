import { EventBus } from "@/core/document-commenter/events/EventBus";
import { EventBusPlugin } from "@/core/document-commenter/events/EventBusPlugin";
import type { EventHandlerOf } from "@/core/document-commenter/events/EventTypes";

export type SelectionState = "idle" | "dragging";

export class SelectionEventPlugin extends EventBusPlugin {
    private eventBus: Nullable<EventBus> = null;

    public state: SelectionState = "idle";
    public startPosition: Vector2d = { x: -1, y: -1 };

    constructor() {
        super();
        this.initialize();
    }

    public override install(eventBus: EventBus): void {
        this.eventBus = eventBus;

        this.eventBus.subscribe("raw:mousedown", this.handleMouseDown);
        this.eventBus.subscribe("raw:mousemove", this.handleMouseMove);
        this.eventBus.subscribe("raw:mouseup", this.handleMouseUp);
    }

    public override uninstall(): void {
        this.eventBus?.unsubscribe("raw:mousedown", this.handleMouseDown);
        this.eventBus?.unsubscribe("raw:mousemove", this.handleMouseMove);
        this.eventBus?.unsubscribe("raw:mouseup", this.handleMouseUp);
        this.initialize();
    }

    private initialize() {
        this.state = "idle";
        this.startPosition = { x: 0, y: 0 };
        this.eventBus = null;
    }

    private handleMouseDown: EventHandlerOf<"raw:mousedown"> = (event) => {
        if (this.state !== "idle") return;

        this.state = "dragging";
        this.startPosition = event.payload;

        this.eventBus?.dispatch({
            type: "selection:start",
            payload: this.startPosition,
        });
    };

    private handleMouseMove: EventHandlerOf<"raw:mousemove"> = (event) => {
        if (this.state !== "dragging") return;

        this.eventBus?.dispatch({
            type: "selection:move",
            payload: { start: this.startPosition, current: event.payload },
        });
    };

    private handleMouseUp: EventHandlerOf<"raw:mouseup"> = (event) => {
        if (this.state !== "dragging") return;

        this.state = "idle";

        if (
            this.startPosition.x === event.payload.x ||
            this.startPosition.y === event.payload.y ||
            this.startPosition.x === -1 ||
            this.startPosition.y === -1
        ) {
            return;
        } else if (
            this.startPosition.x > event.payload.x &&
            this.startPosition.y < event.payload.y
        ) {
            this.eventBus?.dispatch({
                type: "selection:end",
                payload: {
                    start: {
                        x: event.payload.x,
                        y: this.startPosition.y,
                    },
                    end: {
                        x: this.startPosition.x,
                        y: event.payload.y,
                    },
                },
            });
        } else if (
            this.startPosition.x > event.payload.x &&
            this.startPosition.y > event.payload.y
        ) {
            this.eventBus?.dispatch({
                type: "selection:end",
                payload: {
                    start: event.payload,
                    end: this.startPosition,
                },
            });
        } else if (
            this.startPosition.x < event.payload.x &&
            this.startPosition.y > event.payload.y
        ) {
            this.eventBus?.dispatch({
                type: "selection:end",
                payload: {
                    start: {
                        x: this.startPosition.x,
                        y: event.payload.y,
                    },
                    end: {
                        x: event.payload.x,
                        y: this.startPosition.y,
                    },
                },
            });
        } else if (
            this.startPosition.x < event.payload.x &&
            this.startPosition.y < event.payload.y
        ) {
            this.eventBus?.dispatch({
                type: "selection:end",
                payload: {
                    start: this.startPosition,
                    end: event.payload,
                },
            });
        }
    };
}
