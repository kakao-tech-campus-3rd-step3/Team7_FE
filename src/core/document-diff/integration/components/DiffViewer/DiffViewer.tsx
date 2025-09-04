import { FileType, type FileTypes } from "@/core/@types/FileType";
import { PdfDiffViewer } from "@/core/document-diff/integration/components/DiffViewer/PdfDiffViewer";
import { useDocumentDiff } from "@/core/document-diff/integration/hooks/useDocumentDiff";

export interface DiffViewerProps {
    pendingFallback: React.ReactNode;
    errorFallback: React.ReactNode;

    fileType: FileTypes;
    beforeSrc: string;
    afterSrc: string;
}

export const DiffViewer = ({ pendingFallback, fileType, beforeSrc, afterSrc }: DiffViewerProps) => {
    const { isProcessing, diffResult, isError, error } = useDocumentDiff({
        fileType: fileType,
        before: beforeSrc,
        after: afterSrc,
    });

    if (isProcessing) return pendingFallback;
    if (isError || !diffResult) throw error;

    switch (fileType) {
        case FileType.PDF:
            return (
                <PdfDiffViewer renderer="pdf" before={diffResult.before} after={diffResult.after} />
            );

        // TODO : PlainTextDiffViewer, MarkdownDiffViewer 구현 후 추가
        case FileType.TEXT:
        case FileType.MARKDOWN:
        default:
            throw new Error(`Unsupported file type: ${fileType}`);
    }
};
