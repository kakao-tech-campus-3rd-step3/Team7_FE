import { useCallback, useEffect } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";

import { usePdfPageContext } from "@/core/document-viewer/contexts/PdfPageContext";

export const PdfPageController = () => {
    const {
        currentPage,
        totalPages,
        isInPageRange,
        toNextPage,
        toPrevPage,
        jumpToPage,
        initializePages,
    } = usePdfPageContext();

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && isInPageRange(value)) jumpToPage(value);
        },
        [isInPageRange, jumpToPage],
    );

    useEffect(() => {
        if (initializePages) initializePages(totalPages);
    }, [initializePages, totalPages]);

    return (
        <div className="absolute top-2 right-2 z-10">
            <ul className="inline-flex items-center rounded-md border p-0.5 text-sm bg-white">
                <li>
                    <button
                        aria-label="이전 페이지"
                        type="button"
                        disabled={currentPage <= 1}
                        onClick={toPrevPage}
                        className="grid h-8 w-6 cursor-pointer place-items-center rounded-md disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronLeft strokeWidth={1.5} size={18} />
                    </button>
                </li>

                <li className="px-1">
                    <div className="flex items-baseline gap-1">
                        <Input
                            min={1}
                            max={totalPages}
                            type="number"
                            value={currentPage}
                            onChange={handleInputChange}
                            className={cn(
                                "h-auto w-6 border-none p-0 text-sm text-center shadow-none rounded-none focus-visible:ring-0",
                                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                            )}
                        />
                        <span className="text-slate-400">/</span>
                        <span className="w-6 text-center text-slate-600">{totalPages}</span>
                    </div>
                </li>

                <li>
                    <button
                        aria-label="다음 페이지"
                        type="button"
                        disabled={currentPage >= totalPages}
                        onClick={toNextPage}
                        className="grid h-8 w-6 cursor-pointer place-items-center rounded-md disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronRight strokeWidth={1.5} size={18} />
                    </button>
                </li>
            </ul>
        </div>
    );
};
