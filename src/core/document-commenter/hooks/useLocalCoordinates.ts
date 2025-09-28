import { useRef, useCallback } from "react";

export const useLocalCoordinates = <T extends HTMLElement>() => {
    const elementRef = useRef<T>(null);

    const getCoords = useCallback((coords: Vector2d) => {
        if (!elementRef.current) return null;

        const rect = elementRef.current.getBoundingClientRect();

        return { x: coords.x - rect.left, y: coords.y - rect.top };
    }, []);

    return { ref: elementRef, getCoords };
};
