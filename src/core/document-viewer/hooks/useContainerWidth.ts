import { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface UseContainerWidthResult {
    ref: React.RefObject<HTMLDivElement>;
    width: number;
}

export const useContainerWidth = (fallback = 600): UseContainerWidthResult => {
    const ref = useRef<HTMLDivElement>(null!);
    const [width, setWidth] = useState(fallback);

    const measure = () => {
        const el = ref.current;
        if (!el) return;
        const w = Math.floor(el.getBoundingClientRect().width) - 2;
        if (w > 0 && w !== width) setWidth(w);
    };

    useLayoutEffect(measure, []);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener("resize", measure);
        const id = requestAnimationFrame(measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
            cancelAnimationFrame(id);
        };
    }, []);

    return { ref, width };
};
