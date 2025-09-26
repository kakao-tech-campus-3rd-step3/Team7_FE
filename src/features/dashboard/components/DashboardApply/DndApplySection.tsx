import { useCallback } from "react";
import { useDrop } from "react-dnd";

import { SECTION_ORDER, DND_ITEM_TYPES, type Section, type DragItem } from "../../models/types";
import { DashboardApplyWrapper } from "./DashboardApplyWrapper";

export interface DndApplySectionProps extends Omit<React.ComponentProps<"div">, "onDrop" | "ref"> {
    title: string;
    value: number;
    wrapperClassName?: string;
    sectionKey: Section;
    sectionIndex: number;
    maxStep?: 1 | 2;
    onCardDrop: (item: DragItem) => void;
    children?: React.ReactNode;
}

export const DndApplySection = ({
    title,
    value,
    wrapperClassName,
    sectionIndex,
    maxStep = 2,
    onCardDrop,
    children,
    className,
    ...props
}: DndApplySectionProps) => {
    const [{ isOver, canDrop }, dropRef] = useDrop<
        DragItem,
        void,
        { isOver: boolean; canDrop: boolean }
    >(
        () => ({
            accept: DND_ITEM_TYPES.APPLY_CARD,
            canDrop: (item) => {
                const from = SECTION_ORDER.indexOf(item.from);
                const diff = sectionIndex - from;
                return diff !== 0 && Math.abs(diff) <= maxStep;
            },
            drop: (item) => {
                onCardDrop(item);
            },
            collect: (monitor) => ({
                isOver: monitor.isOver({ shallow: true }),
                canDrop: monitor.canDrop(),
            }),
        }),
        [sectionIndex, maxStep, onCardDrop],
    );

    const setDropRef = useCallback(
        (node: HTMLDivElement | null) => {
            dropRef(node);
        },
        [dropRef],
    );

    return (
        <div className={className} {...props}>
            <DashboardApplyWrapper
                title={title}
                value={value}
                wrapperClassName={wrapperClassName}
                droppableRef={setDropRef}
                isOver={isOver}
                canDrop={canDrop}
            >
                {children}
            </DashboardApplyWrapper>
        </div>
    );
};
