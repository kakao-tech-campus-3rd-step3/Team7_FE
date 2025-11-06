import { api } from "@/app/lib/api";

import type { ApiEnvelope, CoverLetterListResponse } from "./types";

export async function getCoverLetterListByApplicationId(appId: number, page = 0, size = 50) {
    const res = await api.get<ApiEnvelope<CoverLetterListResponse>>(
        `/api/applications/${appId}/cover-letters?page=${page}&size=${size}`,
    );
    return res.data;
}
