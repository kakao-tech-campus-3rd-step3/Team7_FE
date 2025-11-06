import { useEffect, useState } from "react";

import { FileType } from "@/core/@types/FileType";

export type DiffInput = string | ArrayBuffer | Uint8Array | { data: Uint8Array };

export interface UseDocumentDiffOptions<T = string> {
    fileType: (typeof FileType)[keyof typeof FileType];
    before: T;
    after: T;
    suspense?: boolean;
}

export interface UseDocumentDiffResult<T = string> {
    diffResult: { before: T; after: T } | null;
    isProcessing: boolean;
    isError: boolean;
    error: unknown;
}

export function useDocumentDiff<T = string>({
    fileType,
    before,
    after,
    suspense = false,
}: UseDocumentDiffOptions<T>): UseDocumentDiffResult<T> {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const [diffResult, setDiffResult] = useState<{ before: T; after: T } | null>(null);

    useEffect(() => {
        let mounted = true;
        const run = async () => {
            try {
                setIsProcessing(true);
                setIsError(false);
                setError(null);

                const result = { before, after };

                if (mounted) setDiffResult(result);
            } catch (err) {
                if (mounted) {
                    setIsError(true);
                    setError(err);
                }
            } finally {
                if (mounted) setIsProcessing(false);
            }
        };

        run();
        return () => {
            mounted = false;
        };
    }, [fileType, before, after, suspense]);

    return { diffResult, isProcessing, isError, error };
}
