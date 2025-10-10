import { useEffect, useRef, type CSSProperties } from "react";

import { useEventBus } from "@/core/document-commenter/contexts/EventBusContext";
import type { EventHandlerOf } from "@/core/document-commenter/events/EventTypes";

export interface CommentAreaPlaceholderProps {
    borderColor: CSSProperties["borderColor"];
    backgroundColor: CSSProperties["backgroundColor"];
}

export const CommentAreaPlaceholder = ({
    borderColor,
    backgroundColor,
}: CommentAreaPlaceholderProps) => {
    const areaPlaceholderRef = useRef<HTMLElement>(null);
    const eventBus = useEventBus();
    const startPosition = useRef<Vector2d>({ x: 0, y: 0 });
    const currentPosition = useRef<Vector2d>({ x: 0, y: 0 });

    useEffect(() => {
        const handleSelectionStart: EventHandlerOf<"selection:start"> = (event) => {
            startPosition.current = event.payload;
            if (!areaPlaceholderRef.current) return;

            Object.assign(areaPlaceholderRef.current.style, {
                visibility: "visible",
                top: `${event.payload.y}px`,
                left: `${event.payload.x}px`,
                width: "0px",
                height: "0px",
            });
        };

        const handleSelectionMove: EventHandlerOf<"selection:move"> = (event) => {
            currentPosition.current = event.payload.current;
            if (!areaPlaceholderRef.current) return;

            const width = event.payload.current.x - startPosition.current.x;
            const height = event.payload.current.y - startPosition.current.y;

            const nextLeft =
                width < 0 ? `${event.payload.current.x}px` : `${startPosition.current.x}px`;
            const nextTop =
                height < 0 ? `${event.payload.current.y}px` : `${startPosition.current.y}px`;

            Object.assign(areaPlaceholderRef.current.style, {
                width: `${Math.abs(width)}px`,
                height: `${Math.abs(height)}px`,
                left: nextLeft,
                top: nextTop,
            });
        };

        const handleSelectionEnd: EventHandlerOf<"selection:end"> = () => {
            if (!areaPlaceholderRef.current) return;
            if (areaPlaceholderRef.current.style.visibility === "hidden") return;

            Object.assign(areaPlaceholderRef.current.style, {
                visibility: "hidden",
            });
        };

        eventBus.subscribe("selection:start", handleSelectionStart);
        eventBus.subscribe("selection:move", handleSelectionMove);
        eventBus.subscribe("selection:end", handleSelectionEnd);

        return () => {
            eventBus.unsubscribe("selection:start", handleSelectionStart);
            eventBus.unsubscribe("selection:move", handleSelectionMove);
            eventBus.unsubscribe("selection:end", handleSelectionEnd);
        };
    }, [eventBus]);

    return (
        <mark
            ref={areaPlaceholderRef}
            style={{
                position: "absolute",
                border: `1px dashed ${borderColor}`,
                backgroundColor,
                pointerEvents: "none",
            }}
        />
    );
};
