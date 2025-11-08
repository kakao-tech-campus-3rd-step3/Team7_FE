import type { CSSProperties } from "react";

export interface SkeletonProps {
    width: CSSProperties["width"];
    height: CSSProperties["height"];
    borderRadius?: CSSProperties["borderRadius"];
    className?: string;
}

export const Skeleton = ({
    width,
    height,
    borderRadius = "0.25rem",
    className = "",
}: SkeletonProps) => {
    return (
        <div
            className={`animate-pulse bg-gray-100 dark:bg-skeleton-dark ${className}`}
            style={{ width, height, borderRadius }}
        />
    );
};
