import { useNavigate } from "react-router";

import {
    MenteeDashboardListItem,
    type MenteeDashboardListItemProps,
} from "./MenteeDashboardListItem";

export type MenteeDashboardListItemData = { id: string } & Omit<
    MenteeDashboardListItemProps,
    "className" | "onItemClick" | "onEdit" | "onDelete"
>;

export interface MenteeDashboardListProps {
    items: Array<MenteeDashboardListItemData>;
    onItemClick?: (item: MenteeDashboardListItemData) => void;
    onEdit?: (item: MenteeDashboardListItemData) => void;
    onDelete?: (item: MenteeDashboardListItemData) => void;
}

export function MenteeDashboardList({
    items,

    onEdit,
    onDelete,
}: MenteeDashboardListProps) {
    const navigate = useNavigate();

    if (!items || items.length === 0) {
        return (
            <li className="p-6 text-center text-sm text-muted-foreground">
                아직 지원 내역이 없습니다.
            </li>
        );
    }

    return (
        <>
            {items.map((application) => (
                <MenteeDashboardListItem
                    key={application.id}
                    icon={application.icon}
                    company={application.company}
                    position={application.position}
                    dday={application.dday}
                    onItemClick={() => {
                        navigate(`/mentee/applications/${application.id}`);
                    }}
                    onEdit={onEdit ? () => onEdit(application) : undefined}
                    onDelete={onDelete ? () => onDelete(application) : undefined}
                />
            ))}
        </>
    );
}
