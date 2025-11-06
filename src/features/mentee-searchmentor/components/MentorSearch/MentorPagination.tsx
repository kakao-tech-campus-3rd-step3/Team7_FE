import { useMemo } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export interface MentorPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    className?: string;
}

type PageItem = { type: "page"; value: number; id: string } | { type: "ellipsis"; id: string };

export const MentorPagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: MentorPaginationProps) => {
    const displayPage = currentPage + 1;

    const pageItems = useMemo<PageItem[]>(() => {
        const items: PageItem[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push({ type: "page", value: i, id: `page-${i}` });
            }
        } else {
            if (displayPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    items.push({ type: "page", value: i, id: `page-${i}` });
                }
                items.push({ type: "ellipsis", id: "ellipsis-end" });
                items.push({ type: "page", value: totalPages, id: `page-${totalPages}` });
            } else if (displayPage >= totalPages - 2) {
                items.push({ type: "page", value: 1, id: `page-${1}` });
                items.push({ type: "ellipsis", id: "ellipsis-start" });
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    items.push({ type: "page", value: i, id: `page-${i}` });
                }
            } else {
                items.push({ type: "page", value: 1, id: `page-${1}` });
                items.push({ type: "ellipsis", id: "ellipsis-start" });
                for (let i = displayPage - 1; i <= displayPage + 1; i++) {
                    items.push({ type: "page", value: i, id: `page-${i}` });
                }
                items.push({ type: "ellipsis", id: "ellipsis-end" });
                items.push({ type: "page", value: totalPages, id: `page-${totalPages}` });
            }
        }

        return items;
    }, [displayPage, totalPages]);

    const handlePageClick = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber - 1);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={cn("mt-6 flex items-center justify-center gap-2", className)}>
            <Button
                variant="outline"
                size="sm"
                onClick={handlePrevClick}
                disabled={currentPage === 0}
                className="h-9 w-9 p-0"
                aria-label="이전 페이지"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
                {pageItems.map((item) => {
                    if (item.type === "ellipsis") {
                        return (
                            <span key={item.id} className="px-2 py-1 text-sm text-slate-500">
                                ...
                            </span>
                        );
                    }

                    const pageNum = item.value;
                    const isActive = pageNum === displayPage;

                    return (
                        <Button
                            key={item.id}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageClick(pageNum)}
                            className={cn(
                                "h-9 min-w-9 px-3",
                                isActive && "bg-primary text-primary-foreground",
                            )}
                            aria-label={`${pageNum}페이지로 이동`}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {pageNum}
                        </Button>
                    );
                })}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={handleNextClick}
                disabled={currentPage >= totalPages - 1}
                className="h-9 w-9 p-0"
                aria-label="다음 페이지"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};
