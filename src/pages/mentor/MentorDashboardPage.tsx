import { Suspense } from "react";

import { MentorReviewListContainer } from "@/features/mentor-dashboard/containers/MentorReviewListContainer";

import { HeaderWithTitle } from "@/shared/components/Layout/Header";

export default function MentorDashboardPage() {
    return (
        <main className="px-6 py-6">
            <HeaderWithTitle title="대기중인 리뷰" />

            <Suspense fallback={<div>로딩 중...</div>}>
                <MentorReviewListContainer />
            </Suspense>
        </main>
    );
}
