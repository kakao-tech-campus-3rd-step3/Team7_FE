import type { EventBus } from "@/core/document-commenter/events/EventBus";
import { EventBusPlugin } from "@/core/document-commenter/events/EventBusPlugin";
import type { EventHandlerOf } from "@/core/document-commenter/events/EventTypes";

export type PanState = "idle" | "panning";

export class PanEventPlugin extends EventBusPlugin {
    private eventBus: Nullable<EventBus> = null;

    public state: PanState = "idle";
    private startPosition: { x: number; y: number } | null = null;
    private activePointerId: number | null = null;
    private cumulativeOffset: { x: number; y: number } = { x: 0, y: 0 };
    private lastPosition: { x: number; y: number } | null = null;

    public override install(eventBus: EventBus): void {
        this.eventBus = eventBus;

        this.eventBus.subscribe("raw:pointerdown", this.handlePointerDown);
        this.eventBus.subscribe("raw:pointermove", this.handlePointerMove);
        this.eventBus.subscribe("raw:pointerup", this.handlePointerUp);
    }

    public override uninstall(): void {
        this.eventBus?.unsubscribe("raw:pointerdown", this.handlePointerDown);
        this.eventBus?.unsubscribe("raw:pointermove", this.handlePointerMove);
        this.eventBus?.unsubscribe("raw:pointerup", this.handlePointerUp);
    }

    private handlePointerDown: EventHandlerOf<"raw:pointerdown"> = (event) => {
        const { x, y, button, pointerId } = event.payload;

        if (button !== 1) return;

        this.state = "panning";
        this.startPosition = { x, y };
        this.activePointerId = pointerId;

        this.eventBus?.dispatch({
            type: "pan:start",
            payload: { x, y },
        });
    };

    private handlePointerMove: EventHandlerOf<"raw:pointermove"> = (event) => {
        if (this.state !== "panning" || !this.startPosition) return;
        if (this.activePointerId !== event.payload.pointerId) return;

        const { x, y } = event.payload;
        this.lastPosition = { x, y }; // 마지막 위치 저장

        const dx = x - this.startPosition.x;
        const dy = y - this.startPosition.y;

        // 누적 offset + 현재 pan에서의 상대적 이동거리 = 절대 위치
        const absoluteX = this.cumulativeOffset.x + dx;
        const absoluteY = this.cumulativeOffset.y + dy;

        this.eventBus?.dispatch({
            type: "pan:move",
            payload: { dx: absoluteX, dy: absoluteY },
        });
    };

    private handlePointerUp: EventHandlerOf<"raw:pointerup"> = (event) => {
        if (this.state !== "panning" || !this.startPosition) return;
        if (this.activePointerId !== event.payload.pointerId) return;

        // pan 종료 시 현재 이동거리를 누적 offset에 추가
        if (this.startPosition && this.lastPosition) {
            const finalDx = this.lastPosition.x - this.startPosition.x;
            const finalDy = this.lastPosition.y - this.startPosition.y;

            this.cumulativeOffset.x += finalDx;
            this.cumulativeOffset.y += finalDy;
        }

        this.state = "idle";
        const endPosition = this.startPosition || { x: 0, y: 0 };
        this.startPosition = null;
        this.lastPosition = null;
        this.activePointerId = null;

        this.eventBus?.dispatch({
            type: "pan:end",
            payload: endPosition,
        });
    };
}
