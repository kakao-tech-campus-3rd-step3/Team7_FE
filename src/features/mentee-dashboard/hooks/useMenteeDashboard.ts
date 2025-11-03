import { useState, useMemo, useCallback, useEffect } from "react";

import type { NewApplicationFormInput } from "@/features/applications/models/application.schema";

import { getCurrentMemberId } from "@/shared/lib/auth";

import type { MenteeDashboardListItemData } from "../components/MenteeDashboardList/MenteeDashboardList";
import { type DashboardViewMode } from "../components/ViewToggle/DashboardViewToggle";
import { SECTION_ORDER } from "../models/types";
import type { Section, ApplyCard, DragItem } from "../models/types";
import {
    useCreateApplication,
    useDeleteApplication,
    useGetApplications,
    useUpdateApplication,
    useUpdateApplicationStatus,
    mapApplicationItemToApplyCard,
    mapSectionToApplicationStatus,
    mapApplicationStatusToSection,
} from "../services";
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

const initialBoard: Record<Section, ApplyCard[]> = {
    planned: [],
    writing: [],
    submitted: [],
    interview: [],
};

export function useMenteeDashboard() {
    const memberId = getCurrentMemberId();
    const { data: applicationsData } = useGetApplications({ memberId });
    const createMutation = useCreateApplication(memberId);
    const updateMutation = useUpdateApplication(memberId);
    const updateStatusMutation = useUpdateApplicationStatus(memberId);
    const deleteMutation = useDeleteApplication(memberId);

    const { board, setBoard } = useBoardState(initialBoard);
    const [view, setView] = useState<DashboardViewMode>("kanban");

    useEffect(() => {
        if (!applicationsData) return;

        const newBoard: Record<Section, ApplyCard[]> = {
            planned: [],
            writing: [],
            submitted: [],
            interview: [],
        };

        applicationsData.applications
            .filter(
                (
                    item,
                ): item is typeof item & {
                    applicationStatus: Exclude<typeof item.applicationStatus, "HIRED">;
                } => item.applicationStatus !== "HIRED",
            )
            .forEach((item) => {
                const card = mapApplicationItemToApplyCard(item);
                const section = mapApplicationStatusToSection(item.applicationStatus);
                newBoard[section].push(card);
            });

        setBoard(newBoard);
    }, [applicationsData, setBoard]);

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
        async (form: ApplicationForm) => {
            await createMutation.mutateAsync({
                companyName: form.companyName,
                applyPosition: form.applyPosition,
                deadline: form.deadline,
                location: form.location,
                employmentType: form.employmentType,
                careerRequirement: form.careerRequirement,
                url: form.url,
            });

            setOpenCreate(false);
        },
        [createMutation],
    );

    const handleUpdate = useCallback(
        async (form: ApplicationForm) => {
            if (!editingCard) return;

            const applicationId = parseInt(editingCard.card.id, 10);
            await updateMutation.mutateAsync({
                applicationId,
                body: {
                    companyName: form.companyName,
                    applyPosition: form.applyPosition,
                    deadline: form.deadline,
                    location: form.location,
                    employmentType: form.employmentType,
                    careerRequirement: form.careerRequirement,
                    url: form.url,
                },
            });

            setEditingCard(null);
            setOpenEdit(false);
        },
        [editingCard, updateMutation],
    );

    const handleDelete = useCallback(async () => {
        if (!deletingCard) return;

        const applicationId = parseInt(deletingCard.cardId, 10);
        await deleteMutation.mutateAsync(applicationId);

        setDeletingCard(null);
        setOpenDelete(false);
    }, [deletingCard, deleteMutation]);

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
        moveTo: (dragItem: DragItem, toSection: Section) => {
            const applicationId = parseInt(dragItem.id, 10);
            const newStatus = mapSectionToApplicationStatus(toSection);

            updateStatusMutation.mutate({
                applicationId,
                body: { newStatus },
            });
        },
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
