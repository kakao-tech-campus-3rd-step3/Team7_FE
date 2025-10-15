import type { PropsWithChildren, ReactNode } from "react";
import React from "react";

import { cn } from "@/shared/lib/utils";

export interface DiffLayoutProps extends PropsWithChildren {
    className?: string;
    gapXClass?: string;
    showDivider?: boolean;
    center?: boolean;
    panelClassName?: string;
    leftClassName?: string;
    rightClassName?: string;
    leftAccentClass?: string;
    rightAccentClass?: string;

    panelWrapper?: (args: {
        side: "left" | "right";
        children: ReactNode;
        className: string;
    }) => ReactNode;
}

export const DiffLayout = ({
    children,
    className = "w-full h-full",
    gapXClass = "gap-x-6",
    showDivider = true,
    center = true,
    panelClassName = "rounded-lg border bg-white",
    leftClassName = "",
    rightClassName = "",
    leftAccentClass = "",
    rightAccentClass = "",
    panelWrapper,
}: DiffLayoutProps) => {
    const items = React.Children.toArray(children);
    const left = items[0] ?? null;
    const right = items[1] ?? null;

    const basePanel = cn(panelClassName, center && "grid place-items-center", "p-3 h-full");

    const DefaultPanelWrapper = ({
        side,
        children: _children,
        className: _className,
    }: {
        side: "left" | "right";
        children: ReactNode;
        className: string;
    }) => (
        <article aria-label={side === "left" ? "원본 문서" : "수정본 문서"} className={_className}>
            {_children}
        </article>
    );

    const PanelWrapper = panelWrapper ?? DefaultPanelWrapper;

    return (
        <section
            role="group"
            aria-label="문서 비교 레이아웃"
            className={cn("relative grid grid-cols-2", gapXClass, className)}
        >
            {showDivider && (
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-neutral-200"
                />
            )}

            <PanelWrapper side="left" className={cn(basePanel, leftClassName, leftAccentClass)}>
                <div className="w-full max-w-full">{left}</div>
            </PanelWrapper>

            <PanelWrapper side="right" className={cn(basePanel, rightClassName, rightAccentClass)}>
                <div className="w-full max-w-full">{right}</div>
            </PanelWrapper>
        </section>
    );
};
