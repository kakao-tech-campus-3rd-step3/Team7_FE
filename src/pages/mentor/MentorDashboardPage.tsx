import { Suspense } from "react";

import { MentorDashboardContainer } from "@/features/mentor-dashboard/containers/MentorDashboardContainer";

export default function MentorDashboardPage() {
    return (
        <main className="px-6 py-6">
            <header className="mb-4">
                <h1 className="text-xl font-semibold">멘토 대시보드</h1>
                <p className="mt-1 text-sm text-slate-600">후배들의 성장을 도와주세요</p>
            </header>

            <Suspense fallback={<div>로딩 중...</div>}>
                <MentorDashboardContainer />
            </Suspense>
        </main>
    );
}
