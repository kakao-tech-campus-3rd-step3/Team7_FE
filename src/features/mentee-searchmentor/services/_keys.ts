import type { SearchQuery } from "../models/types";

export const MENTOR_QUERY_KEYS = {
    ALL: () => ["mentors"] as const,
    LIST: (query: SearchQuery) => [
        ...MENTOR_QUERY_KEYS.ALL(),
        "list",
        query.search ?? "",
        query.sortBy ?? "RECOMMENDED",
        query.sortOrder ?? "DESC",
        query.page ?? 0,
        query.size ?? 9,
    ] as const,
    HEADER_BY_ID: (mentorId: number) => [...MENTOR_QUERY_KEYS.ALL(), "header", mentorId] as const,
    INTRODUCTION_BY_ID: (mentorId: number) =>
        [...MENTOR_QUERY_KEYS.ALL(), "introduction", mentorId] as const,
    REVIEWS_BY_ID: (mentorId: number) => [...MENTOR_QUERY_KEYS.ALL(), "reviews", mentorId] as const,
} as const;
