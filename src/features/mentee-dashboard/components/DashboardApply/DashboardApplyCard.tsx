import { ChevronRight, Pencil, Trash2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export interface DashboardApplyCardProps extends React.ComponentProps<"div"> {
    company: string;
    position: string;
    dday: string;

    onEdit?: () => void;
    onDelete?: () => void;
    onItemClick?: () => void;
}

export const DashboardApplyCard = ({
    company,
    position,
    dday,

    onEdit,
    onDelete,
    onItemClick,
    className,
    ...props
}: DashboardApplyCardProps) => {
    return (
        <Card {...props} className={cn("rounded-xl border bg-white p-4 gap-2", className)}>
            <header className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-md leading-6 font-medium text-slate-900">
                        {company}
                    </h1>
                    <h2 className="truncate text-xs leading-5 text-slate-600">{position}</h2>
                </div>
            </header>

            <footer className="flex items-end justify-between">
                <Badge variant="destructive" className="opacity-80">
                    {dday}
                </Badge>

                <div className="flex items-center gap-1">
                    {(onEdit || onDelete) && (
                        <div className="flex items-center gap-1">
                            {onEdit && (
                                <Button
                                    className="aspect-square"
                                    variant="ghost"
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit();
                                    }}
                                    title="수정"
                                >
                                    <Pencil size={14} />
                                </Button>
                            )}
                            {onDelete && (
                                <Button
                                    className="aspect-square"
                                    variant="ghost"
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete();
                                    }}
                                    title="삭제"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            )}
                            {onItemClick && (
                                <Button
                                    className="aspect-square"
                                    variant="ghost"
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onItemClick();
                                    }}
                                    title="상세 보기"
                                >
                                    <ChevronRight size={14} />
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </footer>
        </Card>
    );
};
