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
        if (!element) return;

        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const observer = new ResizeObserver(() => {
            if (timeoutId) clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setSize({
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                });
            }, delay);
        });

        observer.observe(element);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [ref, delay]);

    return {
        ref,
        width: size.width,
        height: size.height,
    };
};
