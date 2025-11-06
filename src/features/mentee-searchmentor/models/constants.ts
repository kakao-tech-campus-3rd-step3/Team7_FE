export const MENTOR_TABS = ["소개", "리뷰"] as const;

export const DEFAULT_PAGE_SIZE = 9;

export const SORT_LABEL: Record<import("./types").SortBy, string> = {
    RECOMMENDED: "추천순",
    RATING: "평점순",
    PRICE_LOW: "낮은가격순",
    PRICE_HIGH: "높은가격순",
};
