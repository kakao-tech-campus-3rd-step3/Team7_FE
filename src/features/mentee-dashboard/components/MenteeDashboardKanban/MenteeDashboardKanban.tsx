import { sectionState } from "../../models/constants";
import { SECTION_ORDER, type Section, type ApplyCard, type DragItem } from "../../models/types";
import { DashboardApplyContainer, DndApplyCard, DndApplySection } from "../DashboardApply";

export interface MenteeDashboardKanbanProps {
    board: Record<Section, ApplyCard[]>;
    moveTo: (item: DragItem, to: Section) => void;
    icon?: React.ReactNode;
    className?: string;
}

export function MenteeDashboardKanban({
    board,
    moveTo,
    icon,
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
                                icon={card.icon ?? icon}
                                company={card.company}
                                position={card.position}
                                dday={card.dday}
                            />
                        ))}
                    </DndApplySection>
                );
            })}
        </DashboardApplyContainer>
    );
}
