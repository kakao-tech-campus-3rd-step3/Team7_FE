import type { DashboardApplyCardProps } from "@/features/dashboard/components/DashboardApply";

export const DND_ITEM_TYPES = {
    APPLY_CARD: "APPLY_CARD",
} as const;

export type Section = "planned" | "writing" | "submitted" | "interview";

export type ApplyCard = { id: string } & DashboardApplyCardProps;

export interface DragItem {
    type: typeof DND_ITEM_TYPES.APPLY_CARD;
    id: string;
    from: Section;
    origin: number;
}

export const SECTION_ORDER: Section[] = ["planned", "writing", "submitted", "interview"];
