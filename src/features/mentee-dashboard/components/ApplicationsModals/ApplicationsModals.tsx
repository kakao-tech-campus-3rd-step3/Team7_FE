import { useMemo } from "react";

import { NewApplicationModal, DeleteConfirmModal } from "@/features/applications";
import type { NewApplicationFormInput } from "@/features/applications/models/application.schema";
import type { NewApplicationFormOutput } from "@/features/applications/models/application.schema";
import type { Section } from "@/features/mentee-dashboard/models/types";

type ApplicationFormPayload = NewApplicationFormOutput & { targetSection?: Section };

interface ApplicationsModalsProps {
    openCreate: boolean;
    onCloseCreate: () => void;
    onCreate: (payload: ApplicationFormPayload) => void;

    openEdit: boolean;
    onCloseEdit: () => void;
    onUpdate: (payload: ApplicationFormPayload) => void;
    editInitialData?: Partial<NewApplicationFormInput>;

    openDelete: boolean;
    onCloseDelete: () => void;
    onConfirmDelete: () => void;
}

export const ApplicationsModals = ({
    openCreate,
    onCloseCreate,
    onCreate,
    openEdit,
    onCloseEdit,
    onUpdate,
    editInitialData,
    openDelete,
    onCloseDelete,
    onConfirmDelete,
}: ApplicationsModalsProps) => {
    const isModalOpen = openCreate || openEdit;
    const isEditMode = !!editInitialData;

    const handleClose = () => {
        if (openCreate) {
            onCloseCreate();
        }
        if (openEdit) {
            onCloseEdit();
        }
    };

    const handleSubmit = useMemo(
        () => (payload: ApplicationFormPayload) => {
            if (isEditMode) {
                onUpdate(payload);
            } else {
                onCreate(payload);
            }
        },
        [isEditMode, onCreate, onUpdate],
    );

    return (
        <>
            <NewApplicationModal
                open={isModalOpen}
                onClose={handleClose}
                onCreate={handleSubmit}
                initialData={editInitialData}
                isEditMode={isEditMode}
            />

            <DeleteConfirmModal
                open={openDelete}
                onClose={onCloseDelete}
                onConfirm={onConfirmDelete}
            />
        </>
    );
};
