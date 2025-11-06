import { useCallback } from "react";

import { useEventBus } from "@/core/document-commenter/contexts/EventBusContext";
import { useLocalCoordinates } from "@/core/document-commenter/hooks/useLocalCoordinates";

export const useRegisterEvents = () => {
    const eventBus = useEventBus();
    const { ref, getCoords } = useLocalCoordinates<HTMLDivElement>();

    const onMouseDown = useCallback(
        (event: React.MouseEvent) => {
            if (event.button !== 0) return;
            const localCoords = getCoords({ x: event.clientX, y: event.clientY });
            if (!localCoords) return;
            eventBus.dispatch({ type: "raw:mousedown", payload: localCoords });
        },
        [eventBus, getCoords],
    );

    const onMouseMove = useCallback(
        (event: React.MouseEvent) => {
            if (event.button !== 0) return;
            const localCoords = getCoords({ x: event.clientX, y: event.clientY });
            if (!localCoords) return;
            eventBus.dispatch({ type: "raw:mousemove", payload: localCoords });
        },
        [eventBus, getCoords],
    );

    const onMouseUp = useCallback(
        (event: React.MouseEvent) => {
            if (event.button !== 0) return;
            const localCoords = getCoords({ x: event.clientX, y: event.clientY });
            if (!localCoords) return;
            eventBus.dispatch({ type: "raw:mouseup", payload: localCoords });
        },
        [eventBus, getCoords],
    );

    const onPointerDown = useCallback(
        (e: React.PointerEvent) => {
            eventBus.dispatch({
                type: "raw:pointerdown",
                payload: {
                    x: e.clientX,
                    y: e.clientY,
                    button: e.button,
                    pointerId: e.pointerId,
                },
            });
        },
        [eventBus],
    );

    const onPointerMove = useCallback(
        (e: React.PointerEvent) => {
            eventBus.dispatch({
                type: "raw:pointermove",
                payload: {
                    x: e.clientX,
                    y: e.clientY,
                    pointerId: e.pointerId,
                },
            });
        },
        [eventBus],
    );

    const onPointerUp = useCallback(
        (e: React.PointerEvent) => {
            eventBus.dispatch({
                type: "raw:pointerup",
                payload: {
                    pointerId: e.pointerId,
                },
            });
        },
        [eventBus],
    );

    return {
        ref,
        register: {
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onPointerDown,
            onPointerMove,
            onPointerUp,
        },
    };
};
