import type { PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";

export interface DashboardHeaderContainerProps extends PropsWithChildren {
    className?: string;
}

export const DashboardHeaderContainer = ({
    children,
    className,
}: DashboardHeaderContainerProps) => {
    return (
        <section className={cn("flex flex-wrap items-stretch gap-4", className)}>
            {children}
        </section>
    );
};
