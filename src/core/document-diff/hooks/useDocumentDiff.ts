import { useEffect, useMemo, useRef, useState } from "react";

import type { FileTypes } from "@/core/@types/FileType";
import { FileType } from "@/core/@types/FileType";
import type { MarkdownDiffResult } from "@/core/document-diff/MarkdownDiffStrategy";
import type { PdfDiffResult } from "@/core/document-diff/PdfDiffStrategy";
import type { PlainTextDiffResult } from "@/core/document-diff/PlainTextDiffStrategy";
import { createDiffStrategy } from "@/core/document-diff/base/DiffStrategyFactory";

/** 파일 타입 → 입력 소스 타입 매핑 (현재 모두 string 기반) */
type SourceMap = {
    [FileType.PDF]: string;
    [FileType.MARKDOWN]: string;
    [FileType.TEXT]: string;
};

/** 파일 타입 → 결과 타입 매핑 */
type ResultMap = {
    [FileType.PDF]: PdfDiffResult;
    [FileType.MARKDOWN]: MarkdownDiffResult;
    [FileType.TEXT]: PlainTextDiffResult;
};

export interface UseDocumentDiffParams<T extends FileTypes> {
    fileType: T;
    before: SourceMap[T];
    after: SourceMap[T];
    /** Suspense / ErrorBoundary 통합 모드 */
    suspense?: boolean;
}

export interface UseDocumentDiffReturn<T extends FileTypes> {
    isProcessing: boolean;
    isError: boolean;
    error: unknown | null;
    diffResult: ResultMap[T] | null;
}

/**
 * 파일 타입에 따라 입력/출력 타입이 자동 매핑되는 타입 안전 훅
 * - suspense=true 시: 로딩 중 Promise throw, 에러 시 Error throw → 상위 <Suspense> / ErrorBoundary 로 처리
 * - suspense=false 시: 기존처럼 isProcessing/isError/diffResult 플래그 반환
 */
export function useDocumentDiff<T extends FileTypes>(
    params: UseDocumentDiffParams<T>,
): UseDocumentDiffReturn<T> {
    const { fileType, before, after, suspense = false } = params;

    const strategy = useMemo(() => createDiffStrategy<ResultMap[T]>(fileType), [fileType]);

    const suspenseResultRef = useRef<ResultMap[T] | null>(null);
    const suspenseErrorRef = useRef<unknown | null>(null);
    const suspensePromiseRef = useRef<Promise<void> | null>(null);

    useMemo(() => {
        if (!suspense) return;

        const p = (async () => {
            try {
                const result = await strategy.process(
                    before as SourceMap[T],
                    after as SourceMap[T],
                );
                suspenseResultRef.current = result as ResultMap[T];
                suspenseErrorRef.current = null;
            } catch (e) {
                suspenseErrorRef.current = e;
                suspenseResultRef.current = null;
            }
        })();

        suspensePromiseRef.current = p;
    }, [suspense, strategy, fileType, before, after]);

    if (suspense) {
        if (suspenseErrorRef.current) {
            throw suspenseErrorRef.current;
        }
        if (!suspenseResultRef.current) {
            throw suspensePromiseRef.current;
        }

        return {
            isProcessing: false,
            isError: false,
            error: null,
            diffResult: suspenseResultRef.current,
        };
    }

    /** ===== 비-Suspense 모드 (기존 방식) ===== */
    const [isProcessing, setProcessing] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);
    const [diffResult, setDiffResult] = useState<ResultMap[T] | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            try {
                setProcessing(true);
                setIsError(false);
                setError(null);

                const result = await strategy.process(
                    before as SourceMap[T],
                    after as SourceMap[T],
                );
                if (!cancelled) setDiffResult(result as ResultMap[T]);
            } catch (e) {
                if (!cancelled) {
                    setIsError(true);
                    setError(e);
                    setDiffResult(null);
                }
            } finally {
                if (!cancelled) setProcessing(false);
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [strategy, before, after]);

    return { isProcessing, isError, error, diffResult };
}
