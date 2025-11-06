import { useState, useMemo } from "react";

import { DEFAULT_PAGE_SIZE } from "../models/constants";
import type { MentorListItem, SearchQuery, SortBy } from "../models/types";
import { useGetMentors, type MentorListItemResponse } from "../services/getMentors";

function mapMentorListItemResponse(response: MentorListItemResponse): MentorListItem {
    return {
        id: response.id,
        name: response.name,
        company: response.company,
        jobPosition: response.jobPosition,
        profileImageUrl: response.profileImageUrl,
        averageRating: response.averageRating,
        reviewsCount: response.reviewCount,
        experience: response.careerYears,
        menteesCount: response.menteeCount,
        pricePerSession: response.pricePerSession,
        shortIntro: response.shortIntro,
    };
}

export interface UseMentorSearchResult {
    items: MentorListItem[];
    total: number;
    page: number;
    totalPages: number;
    query: SearchQuery;
    setSearch: (searchKeyword: string) => void;
    setSortBy: (sortBy: SortBy) => void;
    goPage: (pageNumber: number) => void;
    reload: () => void;
    isLoading: boolean;
}

export function useMentorSearch(init?: Partial<SearchQuery>): UseMentorSearchResult {
    const [query, setQuery] = useState<SearchQuery>({
        search: init?.search ?? "",
        sortBy: init?.sortBy ?? "RECOMMENDED",
        sortOrder: init?.sortOrder ?? "DESC",
        page: init?.page ?? 0,
        size: init?.size ?? DEFAULT_PAGE_SIZE,
    });

    const { data: response, isLoading, refetch } = useGetMentors(query);

    const { items, total, totalPages } = useMemo(() => {
        if (!response) {
            return { items: [], total: 0, totalPages: 0 };
        }

        const mentorList = response.mentors ?? response.content ?? [];

        const mappedMentors = mentorList.map(mapMentorListItemResponse);

        const totalElements = response.totalElements ?? response.pageInfo?.totalElements ?? 0;
        const totalPagesValue = response.totalPages ?? response.pageInfo?.totalPages ?? 0;

        return {
            items: mappedMentors,
            total: totalElements,
            totalPages: totalPagesValue,
        };
    }, [response]);

    return {
        items,
        total,
        page: query.page ?? 0,
        totalPages,
        query,
        setSearch: (searchKeyword) =>
            setQuery((prevQuery) => ({ ...prevQuery, search: searchKeyword, page: 0 })),
        setSortBy: (sortBy) => setQuery((prevQuery) => ({ ...prevQuery, sortBy, page: 0 })),
        goPage: (pageNumber) => setQuery((prevQuery) => ({ ...prevQuery, page: pageNumber })),
        reload: () => refetch(),
        isLoading,
    };
}
