import { useDrag } from "react-dnd";

import {
    DashboardApplyCard,
    type DashboardApplyCardProps,
} from "@/features/dashboard/components/DashboardApply";
import { DND_ITEM_TYPES, type Section } from "@/features/dashboard/models/types";

import { cn } from "@/shared/lib/utils";

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
