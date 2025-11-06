import { api } from "@/app/lib/api";

import { DEFAULT_PAGE_SIZE } from "../models/constants";
import type { SearchQuery, SortBy } from "../models/types";
import { MENTOR_QUERY_KEYS } from "./_keys";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetMentorsQueryParams {
    search?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
    page?: number;
    size?: number;
}

export interface MentorListItemResponse {
    id: number;
    name: string;
    profileImageUrl: string | null;
    company: string;
    jobPosition: string;
    careerYears: number;
    averageRating: number;
    reviewCount: number;
    menteeCount: number;
    pricePerSession: number;
    shortIntro?: string;
}

export interface GetMentorsResponseBody {
    content?: MentorListItemResponse[];
    totalElements?: number;
    totalPages?: number;
    number?: number;
    size?: number;
    pageInfo?: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
    mentors?: MentorListItemResponse[];
}

function mapSortByToApiField(sortBy: SortBy): { sortBy: string; sortOrder: "ASC" | "DESC" } {
    switch (sortBy) {
        case "RECOMMENDED":
            return { sortBy: "id", sortOrder: "ASC" };
        case "RATING":
            return { sortBy: "averageRating", sortOrder: "DESC" };
        case "PRICE_LOW":
            return { sortBy: "pricePerSession", sortOrder: "ASC" };
        case "PRICE_HIGH":
            return { sortBy: "pricePerSession", sortOrder: "DESC" };
        default:
            return { sortBy: "id", sortOrder: "ASC" };
    }
}

export async function getMentors(query: SearchQuery): Promise<GetMentorsResponseBody> {
    const params: Record<string, string | number> = {};

    if (query.search && query.search.trim()) {
        params.search = query.search.trim();
    }

    const selectedSortBy = query.sortBy ?? "RECOMMENDED";
    const { sortBy: apiSortByField, sortOrder: apiSortOrder } = mapSortByToApiField(selectedSortBy);
    params.sortBy = apiSortByField;
    params.sortOrder = apiSortOrder;

    const pageNumber = query.page !== undefined ? query.page : 0;
    params.page = pageNumber;

    const pageSize = query.size ?? DEFAULT_PAGE_SIZE;
    params.size = pageSize;

    const { data: response } = await api.get<BaseResponse<GetMentorsResponseBody>>(`/api/mentors`, {
        params,
    });

    const responseData = response.data;

    const mentors = responseData.mentors ?? responseData.content ?? [];

    if (responseData.mentors && Array.isArray(responseData.mentors)) {
        return {
            mentors: [...mentors],
            totalElements: responseData.pageInfo?.totalElements ?? 0,
            totalPages: responseData.pageInfo?.totalPages ?? 0,
            pageInfo: responseData.pageInfo ? { ...responseData.pageInfo } : undefined,
        };
    }

    if (responseData.content && Array.isArray(responseData.content)) {
        return {
            content: [...mentors],
            totalElements: responseData.totalElements ?? responseData.pageInfo?.totalElements ?? 0,
            totalPages: responseData.totalPages ?? responseData.pageInfo?.totalPages ?? 0,
            number: responseData.number ?? responseData.pageInfo?.page ?? 0,
            size: responseData.size ?? responseData.pageInfo?.size ?? pageSize,
        };
    }

    return {
        mentors: [],
        totalElements: responseData.pageInfo?.totalElements ?? 0,
        totalPages: responseData.pageInfo?.totalPages ?? 0,
        pageInfo: responseData.pageInfo ? { ...responseData.pageInfo } : undefined,
    };
}

export const useGetMentors = (query: SearchQuery) => {
    return useSuspenseQuery({
        queryKey: MENTOR_QUERY_KEYS.LIST(query),
        queryFn: () => getMentors(query),
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });
};
