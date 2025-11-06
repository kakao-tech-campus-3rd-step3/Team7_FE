import {
    getCoverLetterDetailById,
    type GetCoverLetterDetailResponseBody,
} from "./getCoverLetterDetailById";
import { DocumentQueryKeys } from "@/core/document-diff/services/_keys";
import { useQuery } from "@tanstack/react-query";

export interface GetCoverLetterDiffByIdsResponseBody {
    before: GetCoverLetterDetailResponseBody["data"];
    after: GetCoverLetterDetailResponseBody["data"];
    beforeText: string;
    afterText: string;
}

function flattenCoverLetterToText(data: GetCoverLetterDetailResponseBody["data"]) {
    return data.coverLetterItems
        .map((item, idx) => [`Q${idx + 1}. ${item.question}`, item.answer].join("\n"))
        .join("\n\n");
}

export async function getCoverLetterDiffByIds(
    applicationId: number,
    leftId: number,
    rightId: number,
) {
    const [left, right] = await Promise.all([
        getCoverLetterDetailById(applicationId, leftId),
        getCoverLetterDetailById(applicationId, rightId),
    ]);

    const before = left.data.data;
    const after = right.data.data;

    return {
        before,
        after,
        beforeText: flattenCoverLetterToText(before),
        afterText: flattenCoverLetterToText(after),
    } satisfies GetCoverLetterDiffByIdsResponseBody;
}

export const useCoverLetterDiffByIds = (
    applicationId: number,
    leftId: number,
    rightId: number,
    enabled = true,
) =>
    useQuery({
        queryKey: DocumentQueryKeys.COVERLETTER_DIFF_BY_IDS(applicationId, leftId, rightId),
        queryFn: () => getCoverLetterDiffByIds(applicationId, leftId, rightId),
        enabled:
            enabled &&
            Number.isFinite(applicationId) &&
            Number.isFinite(leftId) &&
            Number.isFinite(rightId),
    });
