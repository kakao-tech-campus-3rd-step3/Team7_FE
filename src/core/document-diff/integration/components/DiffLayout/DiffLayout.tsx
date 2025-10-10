import type { PropsWithChildren, ReactNode } from "react";
import React from "react";

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

    const basePanel = `${panelClassName} ${center ? "grid place-items-center" : ""} p-3 h-full`;

    const LeftWrapper = panelWrapper
        ? panelWrapper
        : ({ children, className }: { children: ReactNode; className: string }) => (
              <article aria-label="원본 문서" className={className}>
                  {children}
              </article>
          );

    const RightWrapper = panelWrapper
        ? panelWrapper
        : ({ children, className }: { children: ReactNode; className: string }) => (
              <article aria-label="수정본 문서" className={className}>
                  {children}
              </article>
          );

    return (
        <section
            className={`relative grid grid-cols-2 ${gapXClass} ${className}`}
            role="group"
            aria-label="문서 비교 레이아웃"
        >
            {showDivider && (
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-neutral-200"
                />
            )}

            <LeftWrapper
                side="left"
                className={`${basePanel} ${leftClassName} ${leftAccentClass}`.trim()}
            >
                <div className="w-full max-w-full">{left}</div>
            </LeftWrapper>

            <RightWrapper
                side="right"
                className={`${basePanel} ${rightClassName} ${rightAccentClass}`.trim()}
            >
                <div className="w-full max-w-full">{right}</div>
            </RightWrapper>
        </section>
    );
};
