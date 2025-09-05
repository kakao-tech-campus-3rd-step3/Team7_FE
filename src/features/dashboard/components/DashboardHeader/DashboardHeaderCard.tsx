import { cn } from "@/shared/lib/utils";
import { Card, CardTitle, CardDescription } from "@/shared/ui/card";

export interface DashboardHeaderCardProps extends React.ComponentProps<"div"> {
    title: string;
    value: number;
    description: string;
    icon: React.ReactNode;
    iconBg?: string;
}

export const DashboardHeaderCard = ({
    title,
    value,
    description,
    icon,
    iconBg,
    className,
    ...props
}: DashboardHeaderCardProps) => {
    return (
        <Card
            {...props}
            className={cn(
                "flex-1 min-w-[240px] rounded-lg border bg-card text-card-foreground shadow-sm py-6",
                className,
            )}
        >
            <div className="flex items-start justify-between gap-4 px-6">
                <div className="min-w-0">
                    <CardTitle className="text-xs leading-[18px] text-[#485563] font-normal">
                        {title}
                    </CardTitle>
                    <div className="text-2xl font-semibold leading-tight">{value}</div>
                    <CardDescription className="mt-1 text-sm text-emerald-600">
                        {description}
                    </CardDescription>
                </div>

                <div
                    className={cn(
                        "ml-2 grid h-12 w-12 place-items-center rounded-md bg-blue-50 mt-3",
                        iconBg,
                    )}
                >
                    {icon}
                </div>
            </div>
        </Card>
    );
};
