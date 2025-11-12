import { DocumentQueryKeys } from "@/core/document-diff/services/_keys";
import { getPresignedGetUrl } from "@/core/document-diff/services/attachment/getPresignedGetUrl";
import { useQuery } from "@tanstack/react-query";

export interface GetPdfDiffByIdsResponseBody {
    before: string;
    after: string;
}

export async function getResumePdfDiffByIds(
    applicationId: number,
    leftAttachmentId: number,
    rightAttachmentId: number,
) {
    const [left, right] = await Promise.all([
        getPresignedGetUrl(applicationId, leftAttachmentId),
        getPresignedGetUrl(applicationId, rightAttachmentId),
    ]);
    return {
        before: left.presignedUrl,
        after: right.presignedUrl,
    } satisfies GetPdfDiffByIdsResponseBody;
}

export const useResumePdfDiffByIds = (
    applicationId: number,
    leftAttachmentId: number,
    rightAttachmentId: number,
    enabled = true,
) =>
    useQuery({
        queryKey: DocumentQueryKeys.RESUME_PDF_DIFF_BY_IDS(
            applicationId,
            leftAttachmentId,
            rightAttachmentId,
        ),
        queryFn: () => getResumePdfDiffByIds(applicationId, leftAttachmentId, rightAttachmentId),
        enabled:
            enabled &&
            Number.isFinite(applicationId) &&
            Number.isFinite(leftAttachmentId) &&
            Number.isFinite(rightAttachmentId),
    });
