import { KanbanSquare, List } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export type DashboardViewMode = "kanban" | "list";

export interface DashboardViewToggleProps extends Omit<React.ComponentProps<"div">, "onChange"> {
    value: DashboardViewMode;
    onValueChange: (next: DashboardViewMode) => void;
    className?: string;
}

export const DashboardViewToggle = ({
    value,
    onValueChange,
    className,
    ...props
}: DashboardViewToggleProps) => {
    const base =
        "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition";
    const active = "bg-blue-600 text-white border-blue-600 hover:bg-blue-700";
    const inactive = "bg-white text-blue-600 border-blue-200 hover:bg-blue-50";

    return (
        <div {...props} className={cn("inline-flex gap-2", className)}>
            <button
                type="button"
                onClick={() => onValueChange("kanban")}
                className={cn(base, value === "kanban" ? active : inactive)}
            >
                <KanbanSquare className="h-4 w-4" /> 칸반보드
            </button>
            <button
                type="button"
                onClick={() => onValueChange("list")}
                className={cn(base, value === "list" ? active : inactive)}
            >
                <List className="h-4 w-4" /> 리스트
            </button>
        </div>
    );
};
