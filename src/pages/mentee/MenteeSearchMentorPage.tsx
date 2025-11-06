import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import {
    MentorSearchHeader,
    MentorGrid,
    MentorPagination,
    useMentorSearch,
} from "@/features/mentee-searchmentor";

import { PageLoading } from "@/shared/ui/page-loading";

export default function MenteeSearchMentorPage() {
    const navigate = useNavigate();
    const { items, total, page, totalPages, query, setSearch, setSortBy, goPage, isLoading } =
        useMentorSearch();

    const [searchKeyword, setSearchKeyword] = useState(query.search ?? "");

    useEffect(() => {
        setSearchKeyword(query.search ?? "");
    }, [query.search]);

    const handleSearch = () => {
        setSearch(searchKeyword);
    };

    const handleKeywordChange = (value: string) => {
        setSearchKeyword(value);
    };

    const handleProfileClick = (id: number) => {
        navigate(`/mentee/mentors/${id}`);
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-6">
            <MentorSearchHeader
                total={total}
                keyword={searchKeyword}
                onChangeKeyword={handleKeywordChange}
                onSubmit={handleSearch}
                sortBy={query.sortBy ?? "RECOMMENDED"}
                onChangeSortBy={setSortBy}
            />

            {isLoading ? (
                <div className="mt-8 flex justify-center">
                    <PageLoading message="멘토를 검색하는 중..." size={32} />
                </div>
            ) : (
                <>
                    <MentorGrid items={items} onClickProfile={handleProfileClick} />

                    <MentorPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={goPage}
                    />

                    {items.length === 0 && !isLoading && (
                        <div className="mt-8 rounded-xl border bg-white p-8 text-center">
                            <p className="text-slate-600">
                                {searchKeyword
                                    ? "검색 결과가 없습니다."
                                    : "등록된 멘토가 없습니다."}
                            </p>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
