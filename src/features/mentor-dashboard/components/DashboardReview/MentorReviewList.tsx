import { cn } from "@/shared/lib/utils";

import type { ReviewItem, Review } from "../../models/types";
import { MentorReviewListItem } from "./MentorReviewListItem";

export interface MentorReviewListProps {
    items: ReviewItem[];
    active: Review;
    onReviewClick?: (review: ReviewItem) => void;
    onMoreClick?: (review: ReviewItem) => void;
    className?: string;
}

export const MentorReviewList = ({
    items,
    active,
    onReviewClick,
    onMoreClick,
    className,
}: MentorReviewListProps) => {
    const filteredReviews = items.filter((review) =>
        active === "all" ? true : review.status === active,
    );

    return (
        <section className={cn(className)}>
            {filteredReviews.map((review) => (
                <div key={review.id} className="mb-3 last:mb-0">
                    <MentorReviewListItem
                        item={review}
                        onReviewClick={onReviewClick}
                        onMoreClick={onMoreClick}
                    />
                </div>
            ))}
        </section>
    );
};
