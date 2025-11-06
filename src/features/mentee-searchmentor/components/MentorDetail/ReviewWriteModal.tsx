import { useState } from "react";

import { Star } from "lucide-react";

import { toast } from "@/shared/lib/toast";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export interface ReviewWriteModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (rating: number, content: string) => Promise<void>;
    className?: string;
}

export const ReviewWriteModal = ({ open, onClose, onSubmit, className }: ReviewWriteModalProps) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("평점을 선택해주세요.");
            return;
        }

        if (!content.trim()) {
            toast.error("리뷰 내용을 입력해주세요.");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(rating, content.trim());
            setRating(0);
            setContent("");
            onClose();
        } catch {
            toast.error("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        setRating(0);
        setContent("");
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
            <div
                className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[92vw] max-w-[500px] rounded-xl bg-white shadow-xl",
                    className,
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 py-5 border-b">
                    <h3 className="text-base font-semibold text-slate-900">리뷰 작성</h3>
                    <p className="mt-1 text-sm text-slate-500">
                        멘토링 경험에 대한 솔직한 리뷰를 작성해주세요.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5">
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-slate-900">
                            평점 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }).map((_, index) => {
                                const starValue = index + 1;
                                const isActive = starValue <= (hoveredRating || rating);
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setRating(starValue)}
                                        onMouseEnter={() => setHoveredRating(starValue)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="transition-transform hover:scale-110"
                                        disabled={isSubmitting}
                                    >
                                        <Star
                                            className={cn(
                                                "h-8 w-8 transition-colors",
                                                isActive
                                                    ? "text-amber-500 fill-amber-500"
                                                    : "text-slate-300 fill-slate-100",
                                            )}
                                        />
                                    </button>
                                );
                            })}
                            {rating > 0 && (
                                <span className="ml-2 text-sm text-slate-600">{rating}점</span>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="review-content"
                            className="mb-2 block text-sm font-medium text-slate-900"
                        >
                            리뷰 내용 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="review-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="멘토링 경험에 대한 자세한 리뷰를 작성해주세요."
                            rows={6}
                            className={cn(
                                "w-full rounded-md border border-slate-300 px-3 py-2 text-sm",
                                "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                                "disabled:bg-slate-50 disabled:text-slate-500",
                                "resize-none",
                            )}
                            disabled={isSubmitting}
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            {content.length}자 / 최소 10자 이상
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || rating === 0 || content.trim().length < 10}
                            className="bg-[#2563EB] text-white hover:bg-[#1E4FD9] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "작성 중..." : "리뷰 작성"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
