import { useNavigate } from "react-router";

import { cn } from "@/shared/lib/utils";

import type { ReviewItem, Review } from "../../models/types";
import { MentorReviewListItem } from "./MentorReviewListItem";

export interface MentorReviewListProps {
    items: ReviewItem[];
    activeFilter: Review;

    onMoreClick?: (review: ReviewItem) => void;
    className?: string;
}

export const MentorReviewList = ({
    items,
    activeFilter,

    onMoreClick,
    className,
}: MentorReviewListProps) => {
    const filteredReviews = items.filter((review) =>
        activeFilter === "all" ? true : review.status === activeFilter,
    );

    const navigate = useNavigate();

    return (
        <section className={cn(className)}>
            {filteredReviews.map((review) => (
                <div key={review.id} className="mb-3 last:mb-0">
                    <MentorReviewListItem
                        item={review}
                        onReviewClick={(item) => navigate(`/mentee/feedback/${item.id}`)}
                        onMoreClick={onMoreClick}
                    />
                </div>
            ))}
        </section>
    );
};
