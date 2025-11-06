import { Pencil, Trash2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface MenteeDashboardListItemProps extends React.ComponentProps<"li"> {
    icon?: React.ReactNode;
    company: string;
    position: string;
    dday: string;
    onItemClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const MenteeDashboardListItem = ({
    icon,
    company,
    position,
    dday,
    onItemClick,
    onEdit,
    onDelete,
    className,
    ...props
}: MenteeDashboardListItemProps) => {
    return (
        <li {...props} className={cn("p-0", className)}>
            <div
                className={cn(
                    "group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 p-4 sm:p-5",
                    "hover:bg-accent hover:text-accent-foreground",
                )}
            >
                <button
                    type="button"
                    onClick={onItemClick}
                    className="grid w-full grid-cols-[auto_1fr] items-center gap-4 text-left"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                        <div className="grid h-5 w-5 place-items-center rounded-sm bg-muted-foreground/20">
                            {icon}
                        </div>
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                            {company}
                            <span className="mx-2 text-muted-foreground">·</span>
                            <span className="truncate text-muted-foreground">{position}</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            마감 : <span className="text-amber-600">{dday}</span>
                        </p>
                    </div>
                </button>
                {(onEdit || onDelete) && (
                    <div className="flex items-center gap-1">
                        {onEdit && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                                className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                title="수정"
                            >
                                <Pencil size={14} />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                title="삭제"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </li>
    );
};
