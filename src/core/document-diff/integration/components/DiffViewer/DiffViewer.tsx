import React, { Suspense, type ReactNode } from "react";

import { FileType, type FileTypes } from "@/core/@types/FileType";
import { useDocumentDiff } from "@/core/document-diff/hooks/useDocumentDiff";
import { MarkdownDiffViewer } from "@/core/document-diff/integration/components/DiffViewer/MarkdownDiffViewer";
import { PdfDiffViewer } from "@/core/document-diff/integration/components/DiffViewer/PdfDiffViewer";
import { PlainTextDiffViewer } from "@/core/document-diff/integration/components/DiffViewer/PlainTextDiffViewer";

class DiffErrorBoundary extends React.Component<
    { fallback: ReactNode; children: ReactNode },
    { hasError: boolean; error: unknown }
> {
    constructor(props: { fallback: ReactNode; children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, error };
    }
    componentDidCatch() {}
    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? null;
        }
        return this.props.children;
    }
}

export interface DiffViewerProps {
    pendingFallback: React.ReactNode;
    errorFallback: React.ReactNode;

    fileType: FileTypes;
    beforeSrc: string;
    afterSrc: string;
    suspense?: boolean;
}

function InnerDiffRenderer({
    fileType,
    beforeSrc,
    afterSrc,
    suspense,
    pendingFallback,
    errorFallback,
}: DiffViewerProps) {
    const { isProcessing, diffResult, isError, error } = useDocumentDiff({
        fileType,
        before: beforeSrc,
        after: afterSrc,
        suspense,
    });

    if (!suspense) {
        if (isProcessing) return <>{pendingFallback}</>;
        if (isError)
            return <>{errorFallback ?? (error instanceof Error ? error.message : String(error))}</>;
        if (!diffResult) return <>{pendingFallback}</>;
    }

    if (fileType === FileType.PDF) {
        return <PdfDiffViewer before={diffResult!.before} after={diffResult!.after} />;
    }

    if (fileType === FileType.TEXT) {
        return (
            <PlainTextDiffViewer
                before={String(diffResult!.before)}
                after={String(diffResult!.after)}
            />
        );
    }

    if (fileType === FileType.MARKDOWN) {
        return (
            <MarkdownDiffViewer
                before={String(diffResult!.before)}
                after={String(diffResult!.after)}
            />
        );
    }

    return (
        <div className="p-4 text-sm text-neutral-600">
            지원하지 않는 파일 형식입니다. (fileType: {String(fileType)})
        </div>
    );
}

export const DiffViewer = (props: DiffViewerProps) => {
    const { suspense = false, pendingFallback, errorFallback } = props;

    if (!suspense) {
        return <InnerDiffRenderer {...props} />;
    }

    return (
        <DiffErrorBoundary fallback={errorFallback}>
            <Suspense fallback={pendingFallback}>
                <InnerDiffRenderer {...props} />
            </Suspense>
        </DiffErrorBoundary>
    );
};
