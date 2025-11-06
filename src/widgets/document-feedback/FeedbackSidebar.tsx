import { Suspense } from "react";

import { FeedbackCommentList } from "@/features/document-feedback/containers/FeedbackComment/FeedbackCommentList";

import { HTTPExceptionBoundary } from "@/shared/errors/HTTPExceptionBoundary";

export const FeedbackSidebar = () => {
    return (
        <aside className="w-[380px] min-w-[300px] h-full bg-white flex-shrink-0 border-l border-gray-200 relative z-10">
            <header className="p-4 border-b border-gray-200">
                <h2 className="font-semibold">자기소개서 코멘트</h2>
                {/* <p className="text-sm">총 1개</p> */}
            </header>

            <section className="p-4">
                <HTTPExceptionBoundary onError={(error) => <div>{error}</div>}>
                    <Suspense>
                        <FeedbackCommentList />
                    </Suspense>
                </HTTPExceptionBoundary>
            </section>

            <footer></footer>
        </aside>
    );
};
