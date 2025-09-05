import { ArrowRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";

export interface DashboardApplyCardProps extends React.ComponentProps<"div"> {
    icon: React.ReactNode;
    company: string;
    position: string;
    dday: string;
    ddayBg?: string;
}

export const DashboardApplyCard = ({
    icon,
    company,
    position,
    dday,
    ddayBg,
    className,
    ...props
}: DashboardApplyCardProps) => {
    //TODO : dday에 값에 따라 ddayBg 변경
    const ddayBackGround = "bg-[#EA580C]/10 text-[#EA580C] ring-1 ring-[#EA580C]/20";

    return (
        <Card {...props} className={cn("rounded-xl border bg-white p-4", className)}>
            <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-md bg-white ring-1 ring-black/5">
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="truncate text-sm leading-6 font-medium text-slate-900">
                        {company}
                    </div>
                    <div className="truncate text-xs leading-5 text-slate-600">{position}</div>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span
                    className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1",
                        ddayBg ?? ddayBackGround,
                    )}
                >
                    {dday}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground/70" strokeWidth={2} />
            </div>
        </Card>
    );
};
