import { MentorReviewItem } from "@/features/mentor-dashboard/components/DashboardReview/MentorReviewItem";
import { useGetMentorDashboard } from "@/features/mentor-dashboard/services/getMentorDashboard";

export const MentorReviewListContainer = () => {
    const { data } = useGetMentorDashboard();

    if (data.length === 0) {
        return (
            <article className="w-80 h-80 mx-auto text-center">
                <div>아직 들어온 리뷰 요청이 없어요</div>
            </article>
        );
    }

    return data.map((review) => {
        return <MentorReviewItem key={`${review.documentId}-${review.menteeId}`} {...review} />;
    });
};
