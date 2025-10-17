import { useDrag } from "react-dnd";

import { cn } from "@/shared/lib/utils";

import { DND_ITEM_TYPES, type Section } from "../../models/types";
import { DashboardApplyCard, type DashboardApplyCardProps } from "./DashboardApplyCard";

export interface DndApplyCardProps extends DashboardApplyCardProps {
    id: string;
    from: Section;
    origin: number;
    className?: string;
}

export const DndApplyCard = ({ id, from, origin, className, ...props }: DndApplyCardProps) => {
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: DND_ITEM_TYPES.APPLY_CARD,
            item: { id, from, origin },
            collect: (monitor) => ({ isDragging: monitor.isDragging() }),
        }),
        [id, from, origin],
    );

    return (
        <div
            ref={(node) => {
                dragRef(node);
            }}
            className={cn(isDragging && "opacity-60", className)}
        >
            <DashboardApplyCard {...props} />
        </div>
    );
};
