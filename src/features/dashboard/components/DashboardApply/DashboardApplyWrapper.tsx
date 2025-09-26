import type { PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";

export interface DashboardApplyWrapperProps extends PropsWithChildren {
    title: string;
    value: number;
    wrapperClassName?: string;
    className?: string;
    droppableRef?: React.Ref<HTMLDivElement>;
    isOver?: boolean;
    canDrop?: boolean;
}

export const DashboardApplyWrapper = ({
    title,
    value,
    wrapperClassName = "bg-zinc-50",
    className,
    children,
    droppableRef,
    isOver,
    canDrop,
}: DashboardApplyWrapperProps) => {
    const baseState =
        "rounded-xl px-5 py-6 min-h-[420px] sm:min-h-[480px] lg:min-h-[560px] transition outline-offset-0";

    const dropState = {
        isAccepted: isOver && canDrop,
        isBlocked: isOver && !canDrop,
    };

    return (
        <section className={cn("flex flex-col", className)}>
            <header className="mb-2 flex items-center justify-between px-1">
                <h3 className="text-sm leading-6 font-semibold text-slate-900">{title}</h3>
                <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-zinc-100 px-2 text-xs font-medium text-zinc-700">
                    {value}
                </span>
            </header>

            <div
                ref={droppableRef}
                className={cn(baseState, wrapperClassName, {
                    "outline-2 outline-dashed outline-slate-400/70": dropState.isAccepted,
                    "opacity-70": dropState.isBlocked,
                })}
            >
                <div className="flex flex-col gap-4">{children}</div>
            </div>
        </section>
    );
};
