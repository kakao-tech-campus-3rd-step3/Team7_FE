import { cn } from "@/shared/lib/utils";

export interface DashboardApplyContainerProps extends React.ComponentProps<"section"> {
    className?: string;
}

export const DashboardApplyContainer = ({
    className,
    children,
    ...props
}: DashboardApplyContainerProps) => {
    return (
        <section
            {...props}
            className={cn("rounded-xl border bg-card p-4 sm:p-5 shadow-sm", className)}
        >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
        </section>
    );
};
