import { useMemo, useState } from "react";

import { Folder, Star, TimerReset, UsersRound } from "lucide-react";

import { MentorReviewTabs, MentorReviewList, mentorReviewMock } from "@/features/mentor-dashboard";
import type { Review, ReviewCounts, ReviewItem } from "@/features/mentor-dashboard";

import { DashboardHeaderContainer, DashboardHeaderCard } from "@/widgets/dashboard-header";

export default function MentorDashboardPage() {
    const items = useMemo<ReviewItem[]>(() => mentorReviewMock, []);
    const [active, setActive] = useState<Review>("all");

    const counts: ReviewCounts = useMemo(() => {
        const base: ReviewCounts = { all: 0, waiting: 0, progress: 0, done: 0, expired: 0 };
        base.all = items.length;
        items.forEach((review) => {
            base[review.status] += 1;
        });
        return base;
    }, [items]);

    return (
        <main className="px-6 py-6">
            <header className="mb-4">
                <h1 className="text-xl font-semibold">멘토 대시보드</h1>
                <p className="mt-1 text-sm text-slate-600">후배들의 성장을 도와주세요</p>
            </header>

            <DashboardHeaderContainer className="mt-4">
                <DashboardHeaderCard
                    title="이번 주 리뷰"
                    value={12}
                    description="+20% 지난주 대비"
                    icon={<Folder className="h-5 w-5 text-blue-600" strokeWidth={2} />}
                    iconBg="bg-blue-50"
                />
                <DashboardHeaderCard
                    title="평균 평점"
                    value={4.9}
                    description="★★★★★ 최고 등급"
                    icon={<Star className="h-5 w-5 text-amber-500" strokeWidth={2} />}
                    iconBg="bg-amber-50"
                />
                <DashboardHeaderCard
                    title="응답 시간"
                    value={2.1}
                    description="목표 : 3시간 이내"
                    icon={<TimerReset className="h-5 w-5 text-emerald-600" strokeWidth={2} />}
                    iconBg="bg-emerald-50"
                />
                <DashboardHeaderCard
                    title="총 멘티"
                    value={89}
                    description="활발한 멘토링"
                    icon={<UsersRound className="h-5 w-5 text-violet-600" strokeWidth={2} />}
                    iconBg="bg-violet-50"
                />
            </DashboardHeaderContainer>

            <section className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg leading-7 font-semibold text-slate-900">
                        리뷰 요청 관리
                    </h2>
                </div>

                <section className="rounded-xl border bg-card p-4 sm:p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <MentorReviewTabs active={active} counts={counts} onChange={setActive} />
                    </div>

                    <MentorReviewList className="mt-4" items={items} active={active} />
                </section>
            </section>
        </main>
    );
}
