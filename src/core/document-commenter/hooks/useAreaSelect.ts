import { useCallback, useRef, useState, type CSSProperties, type MouseEvent } from "react";

export interface AreaSelectionBoxStyle {
    top: CSSProperties["top"];
    left: CSSProperties["left"];
    width: CSSProperties["width"];
    height: CSSProperties["height"];
}

export const useAreaSelect = () => {
    const rootElementRef = useRef<HTMLCanvasElement | null>(null);

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startPosition, setStartPosition] = useState<Vector2d>({ x: 0, y: 0 });
    const [endPosition, setEndPosition] = useState<Vector2d>({ x: 0, y: 0 });

    const [areaSelectionBoxStyle, setAreaSelectionBoxStyle] =
        useState<AreaSelectionBoxStyle | null>(null);

    const handleMouseDown = useCallback((event: MouseEvent) => {
        if (!rootElementRef.current) return;

        event.preventDefault();

        const rect = rootElementRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setStartPosition({ x, y });
        setEndPosition({ x, y });
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (!isDragging || !rootElementRef.current) return;

            event.preventDefault();

            const rect = rootElementRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setEndPosition({ x, y });

            const top = Math.min(startPosition.y, y);
            const left = Math.min(startPosition.x, x);
            const width = Math.abs(startPosition.x - x);
            const height = Math.abs(startPosition.y - y);

            setAreaSelectionBoxStyle({ top, left, width, height });
        },
        [isDragging, startPosition],
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    return {
        rootElementRef,
        isDragging,
        areaSelectionBoxStyle,

        startPosition,
        endPosition,

        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};
