import { useState, useMemo, Suspense } from "react";

import {
    MentorReviewTabs,
    MentorReviewList,
} from "@/features/mentor-dashboard/components/DashboardReview";
import type { Review, ReviewItem, ReviewCounts } from "@/features/mentor-dashboard/models/types";
import { useGetMentorDashboard } from "@/features/mentor-dashboard/services/getMentorDashboard";

export const MentorDashboardContainer = () => {
    const { data: dashboardData } = useGetMentorDashboard();
    const [active, setActive] = useState<Review>("all");

    // API 데이터를 ReviewItem 타입으로 변환
    const items: ReviewItem[] = useMemo(() => {
        return dashboardData.map((item) => ({
            id: item.documentId.toString(),
            menteeName: item.menteeName,
            company: item.companyName,
            docType: item.documentType as "자기소개서" | "포트폴리오" | "이력서",
            submittedAt: new Date().toISOString(), // API에서 제공하지 않으므로 현재 시간으로 설정
            deadline: item.mentoringDueDate,
            status: "waiting" as const, // API에서 status 필드가 없으므로 기본값 설정
        }));
    }, [dashboardData]);

    const counts: ReviewCounts = useMemo(() => {
        const base: ReviewCounts = { all: 0, waiting: 0, progress: 0, done: 0, expired: 0 };
        base.all = items.length;
        items.forEach((review) => {
            base[review.status] += 1;
        });
        return base;
    }, [items]);

    return (
        <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg leading-7 font-semibold text-slate-900">리뷰 요청 관리</h2>
            </div>

            <section className="rounded-xl border bg-card p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <MentorReviewTabs active={active} counts={counts} onChange={setActive} />
                </div>

                <Suspense fallback={<div className="mt-4">로딩 중...</div>}>
                    <MentorReviewList className="mt-4" items={items} activeFilter={active} />
                </Suspense>
            </section>
        </section>
    );
};
