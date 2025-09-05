import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type PropsWithChildren,
} from "react";

export interface PdfPageContextState {
    currentPage: number;
    totalPages: number;
    toPrevPage: () => void;
    toNextPage: () => void;
    jumpToPage: (page: number) => void;
    initializePages: (totalPages: number) => void;
    isInPageRange: (page: number) => boolean;
}

export const PdfPageContext = createContext<PdfPageContextState | null>(null);

export interface PdfPageContextProviderProps extends PropsWithChildren {}

export const PdfPageContextProvider = ({ children }: PdfPageContextProviderProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const isInPageRange = useCallback(
        (page: number) => {
            return page >= 1 && page <= totalPages;
        },
        [totalPages],
    );

    const toPrevPage = useCallback(() => {
        if (!isInPageRange(currentPage - 1)) return;
        return setCurrentPage((prev) => Math.max(prev - 1, 1));
    }, [currentPage, isInPageRange]);

    const toNextPage = useCallback(() => {
        if (!isInPageRange(currentPage + 1)) return;
        return setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }, [currentPage, isInPageRange, totalPages]);

    const jumpToPage = useCallback(
        (page: number) => {
            if (!isInPageRange(page)) return;
            setCurrentPage(page);
        },
        [isInPageRange],
    );

    const initializePages = useCallback((totalPages: number) => {
        setTotalPages(totalPages);
        setCurrentPage(1);
    }, []);

    return (
        <PdfPageContext.Provider
            value={useMemo(
                () => ({
                    currentPage,
                    totalPages,
                    isInPageRange,
                    toPrevPage,
                    toNextPage,
                    jumpToPage,
                    initializePages,
                }),
                [
                    currentPage,
                    totalPages,
                    isInPageRange,
                    toPrevPage,
                    toNextPage,
                    jumpToPage,
                    initializePages,
                ],
            )}
        >
            {children}
        </PdfPageContext.Provider>
    );
};

export const usePdfPageContext = () => {
    const context = useContext(PdfPageContext);
    if (!context) {
        throw new Error("usePdfPageContext 는 PdfPageContextProvider 내부에서만 사용 가능합니다.");
    }
    return context;
};
