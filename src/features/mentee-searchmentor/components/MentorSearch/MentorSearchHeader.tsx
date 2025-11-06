import { Search, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { SORT_LABEL } from "../../models/constants";
import type { SortBy } from "../../models/types";

export interface MentorSearchHeaderProps {
    total: number;
    keyword: string;
    onChangeKeyword: (keyword: string) => void;
    onSubmit: () => void;
    sortBy: SortBy;
    onChangeSortBy: (sortBy: SortBy) => void;
    className?: string;
}

export const MentorSearchHeader = ({
    total,
    keyword,
    onChangeKeyword,
    onSubmit,
    sortBy,
    onChangeSortBy,
    className,
}: MentorSearchHeaderProps) => {
    return (
        <section className={cn("mt-2", className)}>
            <h1 className="text-xl font-semibold text-slate-900">멘토 찾기</h1>
            <p className="mt-1 text-sm text-slate-600">경험 많은 현직자들과 함께 성장하세요</p>

            <div className="mt-4 rounded-xl border bg-white p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="flex-1 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="col-span-2 relative">
                            <Input
                                value={keyword}
                                onChange={(e) => onChangeKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        onSubmit();
                                    }
                                }}
                                placeholder="멘토, 회사, 직무 검색"
                                className="h-11 pr-10"
                            />
                            {keyword && (
                                <button
                                    type="button"
                                    onClick={() => onChangeKeyword("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                    aria-label="검색어 지우기"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <Button onClick={onSubmit} className="h-11">
                            <Search className="mr-2 h-4 w-4" /> 검색
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        {(["RECOMMENDED", "RATING", "PRICE_LOW", "PRICE_HIGH"] as SortBy[]).map(
                            (k) => (
                                <button
                                    key={k}
                                    type="button"
                                    onClick={() => onChangeSortBy(k)}
                                    className={cn(
                                        "rounded-md px-3 py-2 text-xs font-medium",
                                        sortBy === k
                                            ? "bg-primary/10 text-primary"
                                            : "text-slate-600 hover:bg-slate-100",
                                    )}
                                >
                                    {SORT_LABEL[k]}
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </div>

            <p className="mt-3 text-sm text-slate-600">총 {total}명의 멘토</p>
        </section>
    );
};
