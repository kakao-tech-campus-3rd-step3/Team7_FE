import { sectionState } from "../../models/constants";
import { SECTION_ORDER, type Section, type ApplyCard, type DragItem } from "../../models/types";
import { DashboardApplyContainer, DndApplyCard, DndApplySection } from "../DashboardApply";

export interface MenteeDashboardKanbanProps {
    board: Record<Section, ApplyCard[]>;
    moveTo: (item: DragItem, to: Section) => void;
    icon?: React.ReactNode;
    onEdit?: (card: ApplyCard, section: Section) => void;
    onDelete?: (cardId: string, section: Section) => void;
    className?: string;
}

export function MenteeDashboardKanban({
    board,
    moveTo,
    icon,
    onEdit,
    onDelete,
    className,
}: MenteeDashboardKanbanProps) {
    return (
        <DashboardApplyContainer className={className}>
            {SECTION_ORDER.map((sectionKey, sectionIndex) => {
                const section = sectionState[sectionKey];
                const cards = board[sectionKey];

                return (
                    <DndApplySection
                        key={sectionKey}
                        title={section.title}
                        value={cards.length}
                        wrapperClassName={section.wrapperClassName}
                        sectionKey={sectionKey}
                        sectionIndex={sectionIndex}
                        maxStep={2}
                        onCardDrop={(item) => moveTo(item, sectionKey)}
                    >
                        {cards.map((card, cardIndex) => (
                            <DndApplyCard
                                key={card.id}
                                id={card.id}
                                from={sectionKey}
                                origin={cardIndex}
                                company={card.company}
                                position={card.position}
                                dday={card.dday}
                                onEdit={onEdit ? () => onEdit(card, sectionKey) : undefined}
                                onDelete={
                                    onDelete ? () => onDelete(card.id, sectionKey) : undefined
                                }
                            />
                        ))}
                    </DndApplySection>
                );
            })}
        </DashboardApplyContainer>
    );
}
