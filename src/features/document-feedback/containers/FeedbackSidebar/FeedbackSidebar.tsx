import { FeedbackComment } from "@/features/document-feedback/components/FeedbackComment/FeedbackComment";

export const FeedbackSidebar = () => {
    return (
        <aside className="w-[380px] min-w-[300px] h-full bg-white flex-shrink-0 border-l border-gray-200 relative z-10">
            <header className="p-4 border-b border-gray-200">
                <h2 className="font-semibold">자기소개서 코멘트</h2>
                <p className="text-sm">총 1개</p>
            </header>

            <section className="p-4">
                <FeedbackComment
                    author="홍길동"
                    authorAvatarUrl="/profile.png"
                    content="자기소개서의 첫 번째 문단에서 지원동기가 좀 더 구체적으로 표현되면 좋겠습니다."
                    createdAt="2024-06-21"
                />
            </section>

            <footer></footer>
        </aside>
    );
};
