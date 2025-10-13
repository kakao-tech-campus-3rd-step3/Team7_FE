import { cn } from "@/shared/lib/utils";

export interface MenteeDashboardListContainerProps extends React.ComponentProps<"section"> {}

export function MenteeDashboardListContainer({
    className,
    children,
    ...props
}: MenteeDashboardListContainerProps) {
    return (
        <section {...props} className={cn("rounded-xl border bg-card", className)}>
            <ul role="list" className="divide-y">
                {children}
            </ul>
        </section>
    );
}
