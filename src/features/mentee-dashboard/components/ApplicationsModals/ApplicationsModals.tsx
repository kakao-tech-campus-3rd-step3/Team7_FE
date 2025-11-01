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
    return (
        <>
            <NewApplicationModal open={openCreate} onClose={onCloseCreate} onCreate={onCreate} />

            <NewApplicationModal
                open={openEdit}
                onClose={onCloseEdit}
                onCreate={onUpdate}
                initialData={editInitialData}
                isEditMode={true}
            />

            <DeleteConfirmModal
                open={openDelete}
                onClose={onCloseDelete}
                onConfirm={onConfirmDelete}
            />
        </>
    );
};
