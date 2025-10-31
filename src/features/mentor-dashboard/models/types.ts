export type Review = "all" | "waiting" | "progress" | "done" | "expired";

export const TABS: { key: Review; label: string }[] = [
    { key: "all", label: "전체" },
    { key: "waiting", label: "대기중" },
    { key: "progress", label: "진행중" },
    { key: "done", label: "완료" },
    { key: "expired", label: "만료됨" },
];

export type ReviewCounts = Record<Review, number>;

export interface ReviewItem {
    id: string;
    menteeName: string;
    company: string;
    docType: "자기소개서" | "포트폴리오" | "이력서";
    submittedAt: string;
    deadline?: string;
    urgent?: boolean;
    status: Exclude<Review, "all">;
}

export interface HeaderCard {
    title: string;
    value: number;
    description: string;
    icon: React.ReactNode;
    iconBg?: string;
}
