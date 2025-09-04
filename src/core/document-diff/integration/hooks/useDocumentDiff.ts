import { useCallback, useEffect, useState } from "react";

import type { FileTypes } from "@/core/@types/FileType";
import type { InferDiffResultType } from "@/core/document-diff/base/DiffResult";
import { DiffStrategyFactory } from "@/core/document-diff/base/DiffStrategyFactory";

export interface UseDocumentDiffOptions {
    fileType: FileTypes;
    before: string;
    after: string;
}

export const useDocumentDiff = <T extends FileTypes>(
    options: UseDocumentDiffOptions & { fileType: T },
) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [diffResult, setDiffResult] = useState<InferDiffResultType<T> | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const diffStrategy = DiffStrategyFactory.create(options.fileType);

    const processDiff = useCallback(async () => {
        try {
            setIsProcessing(true);
            setIsError(false);
            setError(null);

            const result = await diffStrategy.process(options.before, options.after);
            setDiffResult(result as InferDiffResultType<T>);
        } catch (err) {
            setIsError(true);
            setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        } finally {
            setIsProcessing(false);
        }
    }, [diffStrategy, options.after, options.before]);

    useEffect(() => {
        processDiff();
    }, [diffStrategy, options.after, options.before, processDiff]);

    return {
        diffResult,
        isProcessing,
        isError,
        error,
    };
};
