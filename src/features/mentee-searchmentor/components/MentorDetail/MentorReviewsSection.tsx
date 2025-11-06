import { Star } from "lucide-react";

import { Button } from "@/shared/ui/button";

export interface MentorReviewsSectionProps {
    average: number;
    total: number;
    reviews: Array<{
        reviewId: number;
        reviewerName: string;
        rating: number;
        content: string;
        createdAt: string;
    }>;
    onWriteReview?: () => void;
}

export const MentorReviewsSection = ({
    average,
    total,
    reviews,
    onWriteReview,
}: MentorReviewsSectionProps) => {
    return (
        <section>
            <div className="mb-4 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">리뷰 ({total})</h3>
                <div className="ml-auto flex items-center gap-3">
                    <div className="inline-flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                        <span className="font-semibold">{average.toFixed(1)}</span>
                    </div>
                    {onWriteReview && (
                        <Button
                            onClick={onWriteReview}
                            size="sm"
                            className="bg-[#2563EB] text-white hover:bg-[#1E4FD9]"
                        >
                            리뷰 작성
                        </Button>
                    )}
                </div>
            </div>

            <ul className="space-y-4">
                {reviews.map((review) => (
                    <li key={review.reviewId} className="rounded-lg border bg-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-slate-300" />
                                <div className="text-sm font-medium">{review.reviewerName}</div>
                            </div>
                            <div className="text-xs text-slate-500">
                                {new Date(review.createdAt).toISOString().slice(0, 10)}
                            </div>
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    className={`h-4 w-4 ${index < review.rating ? "text-amber-500" : "text-slate-300"}`}
                                    fill={index < review.rating ? "currentColor" : "none"}
                                />
                            ))}
                        </div>
                        <p className="mt-2 text-sm text-slate-700">{review.content}</p>
                        <div className="mt-2 text-xs text-slate-500">
                            <button className="mr-3 underline-offset-2 hover:underline">
                                도움됨
                            </button>
                            <button className="underline-offset-2 hover:underline">신고</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
