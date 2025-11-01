import { useState, useMemo, useCallback } from "react";

import type { NewApplicationFormInput } from "@/features/applications/models/application.schema";

import { calcDday } from "@/shared/lib/calcDday";

import type { MenteeDashboardListItemData } from "../components/MenteeDashboardList/MenteeDashboardList";
import { type DashboardViewMode } from "../components/ViewToggle/DashboardViewToggle";
import { sectionMock } from "../models/sectionMock";
import { SECTION_ORDER } from "../models/types";
import type { Section, ApplyCard } from "../models/types";
import { useBoardState } from "./useBoardState";

type ApplicationForm = {
    companyName: string;
    applyPosition: string;
    deadline: string;
    location: string;
    employmentType: string;
    careerRequirement: number;
    url: string;
    targetSection?: Section;
};

export function useMenteeDashboard() {
    const { board, setBoard, moveTo } = useBoardState(sectionMock);
    const [view, setView] = useState<DashboardViewMode>("kanban");

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editingCard, setEditingCard] = useState<{ card: ApplyCard; section: Section } | null>(
        null,
    );
    const [deletingCard, setDeletingCard] = useState<{
        cardId: string;
        section: Section;
    } | null>(null);

    const stats = useMemo(() => {
        const totalApplications = Object.values(board).reduce(
            (sum, sectionCards) => sum + sectionCards.length,
            0,
        );
        const writing = board.writing.length;
        const interview = board.interview.length;

        return { totalApplications, writing, interview };
    }, [board]);

    const listItems: MenteeDashboardListItemData[] = useMemo(
        () =>
            SECTION_ORDER.flatMap((sectionKey) => board[sectionKey]).map((card) => ({
                id: card.id,
                icon: card.icon,
                company: card.company,
                position: card.position,
                dday: card.dday,
            })),
        [board],
    );

    const findCardInBoard = useCallback(
        (cardId: string): { card: ApplyCard; section: Section } | null => {
            for (const [sectionKey, cards] of Object.entries(board)) {
                const card = cards.find((c) => c.id === cardId);
                if (card) {
                    return { card, section: sectionKey as Section };
                }
            }
            return null;
        },
        [board],
    );

    const handleCreate = useCallback(
        (form: ApplicationForm) => {
            const target: Section = form.targetSection ?? "planned";
            const dday = calcDday(form.deadline);

            const newCard: ApplyCard = {
                id: `c${Date.now()}`,
                icon: undefined,
                company: form.companyName,
                position: form.applyPosition,
                dday,
                deadline: form.deadline,
                location: form.location,
                employmentType: form.employmentType,
                careerRequirement: form.careerRequirement,
                url: form.url,
            };

            setBoard((previousBoard) => {
                const nextBoard = { ...previousBoard };
                nextBoard[target] = [...nextBoard[target], newCard];
                return nextBoard;
            });

            setOpenCreate(false);
        },
        [setBoard],
    );

    const handleUpdate = useCallback(
        (form: ApplicationForm) => {
            if (!editingCard) return;

            const { card, section } = editingCard;
            const dday = calcDday(form.deadline);

            const updatedCard: ApplyCard = {
                ...card,
                company: form.companyName,
                position: form.applyPosition,
                dday,
                deadline: form.deadline,
                location: form.location,
                employmentType: form.employmentType,
                careerRequirement: form.careerRequirement,
                url: form.url,
            };

            setBoard((previousBoard) => {
                const nextBoard = { ...previousBoard };
                nextBoard[section] = nextBoard[section].map((c) =>
                    c.id === card.id ? updatedCard : c,
                );
                return nextBoard;
            });

            setEditingCard(null);
            setOpenEdit(false);
        },
        [editingCard, setBoard],
    );

    const handleDelete = useCallback(() => {
        if (!deletingCard) return;

        const { cardId, section } = deletingCard;

        setBoard((previousBoard) => {
            const nextBoard = { ...previousBoard };
            nextBoard[section] = nextBoard[section].filter((c) => c.id !== cardId);
            return nextBoard;
        });

        setDeletingCard(null);
        setOpenDelete(false);
    }, [deletingCard, setBoard]);

    const handleEditClick = useCallback(
        (cardOrItem: ApplyCard | MenteeDashboardListItemData, section?: Section) => {
            let card: ApplyCard;
            let cardSection: Section;

            if (section) {
                card = cardOrItem as ApplyCard;
                cardSection = section;
            } else {
                const item = cardOrItem as MenteeDashboardListItemData;
                const found = findCardInBoard(item.id);
                if (!found) return;
                card = found.card;
                cardSection = found.section;
            }

            setEditingCard({ card, section: cardSection });
            setOpenEdit(true);
        },
        [findCardInBoard],
    );

    const handleDeleteClick = useCallback(
        (cardIdOrItem: string | MenteeDashboardListItemData, section?: Section) => {
            let cardId: string;
            let cardSection: Section;

            if (section) {
                cardId = cardIdOrItem as string;
                cardSection = section;
            } else {
                const item = cardIdOrItem as MenteeDashboardListItemData;
                cardId = item.id;
                const found = findCardInBoard(item.id);
                if (!found) return;
                cardSection = found.section;
            }

            setDeletingCard({ cardId, section: cardSection });
            setOpenDelete(true);
        },
        [findCardInBoard],
    );

    const closeCreateModal = useCallback(() => setOpenCreate(false), []);
    const closeEditModal = useCallback(() => {
        setOpenEdit(false);
        setEditingCard(null);
    }, []);
    const closeDeleteModal = useCallback(() => {
        setOpenDelete(false);
        setDeletingCard(null);
    }, []);

    const editModalInitialData = useMemo((): Partial<NewApplicationFormInput> | undefined => {
        if (!editingCard) return undefined;

        return {
            companyName: editingCard.card.company,
            applyPosition: editingCard.card.position,
            deadline: editingCard.card.deadline || "",
            location: editingCard.card.location || "",
            employmentType: editingCard.card.employmentType || "",
            careerRequirement: editingCard.card.careerRequirement || 0,
            url: editingCard.card.url || "",
        };
    }, [editingCard]);

    return {
        board,
        view,
        stats,
        listItems,

        openCreate,
        openEdit,
        openDelete,
        editModalInitialData,

        setView,
        moveTo,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleEditClick,
        handleDeleteClick,
        openCreateModal: () => setOpenCreate(true),
        closeCreateModal,
        closeEditModal,
        closeDeleteModal,
    };
}
