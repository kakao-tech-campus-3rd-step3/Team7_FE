import { useState, useEffect, useRef } from "react";

/**
 * HTMLElement 의 크기 변경을 디바운스하여 알려주는 커스텀 훅입니다
 * @param delay - 디바운스 지연 시간 (밀리초 단위, 기본값 300ms)
 * @returns { ref, size } - ResizeObserver로 관찰할 와 현재 크기 { width, height }
 */
export const useDebouncedResizeObserver = (delay: number = 300) => {
    const ref = useRef<HTMLElement | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element || typeof ResizeObserver === "undefined") return;
        setSize({ width: element.clientWidth, height: element.clientHeight });

        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;

            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setSize({ width, height }), delay);
        });

        resizeObserver.observe(element);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            resizeObserver.unobserve(element);
            resizeObserver.disconnect();
        };
    }, [delay]);

    return {
        ref,
        width: size.width,
        height: size.height,
    };
};
