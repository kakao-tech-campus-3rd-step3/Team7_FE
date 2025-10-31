import {
    MenteeDashboardListItem,
    type MenteeDashboardListItemProps,
} from "./MenteeDashboardListItem";

export type MenteeDashboardListItemData = { id: string } & Omit<
    MenteeDashboardListItemProps,
    "className" | "onItemClick"
>;

export interface MenteeDashboardListProps {
    items: Array<MenteeDashboardListItemData>;
    onItemClick?: (item: MenteeDashboardListItemData) => void;
}

export function MenteeDashboardList({ items, onItemClick }: MenteeDashboardListProps) {
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
                    onItemClick={onItemClick ? () => onItemClick(application) : undefined}
                />
            ))}
        </>
    );
}
