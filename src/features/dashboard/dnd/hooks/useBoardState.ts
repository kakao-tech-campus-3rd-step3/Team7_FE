import { useState, useCallback } from "react";

import type { Section, ApplyCard, DragItem } from "@/features/dashboard/dnd/types";

export const useBoardState = (initialBoard: Record<Section, ApplyCard[]>) => {
    const [board, setBoard] = useState<Record<Section, ApplyCard[]>>(initialBoard);

    const moveTo = useCallback((dragItem: DragItem, toSection: Section) => {
        setBoard((previousBoard) => {
            if (dragItem.from === toSection) return previousBoard;

            const nextBoard = { ...previousBoard } as Record<Section, ApplyCard[]>;
            const sourceCards = [...nextBoard[dragItem.from]];
            const sourceIndex = sourceCards.findIndex((card) => card.id === dragItem.id);
            if (sourceIndex === -1) return previousBoard;

            const [movedCard] = sourceCards.splice(sourceIndex, 1);
            const targetCards = [...nextBoard[toSection], movedCard];

            nextBoard[dragItem.from] = sourceCards;
            nextBoard[toSection] = targetCards;

            return nextBoard;
        });
    }, []);

    return { board, setBoard, moveTo };
};
