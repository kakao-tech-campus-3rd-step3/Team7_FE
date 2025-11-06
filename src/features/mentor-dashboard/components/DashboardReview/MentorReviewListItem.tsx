import { format } from "date-fns";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import type { ReviewItem } from "../../models/types";

export interface MentorReviewListItemProps extends React.ComponentProps<"div"> {
    item: ReviewItem;
    onReviewClick?: (item: ReviewItem) => void;
    onMoreClick?: (item: ReviewItem) => void;
}

export const MentorReviewListItem = ({
    item,
    onReviewClick,
    onMoreClick,
    className,
    ...props
}: MentorReviewListItemProps) => {
    const submitted = format(new Date(item.submittedAt), "yyyy.MM.dd HH:mm");
    const deadline = item.deadline ? format(new Date(item.deadline), "M월 d일") : "-";

    // const statusInfo = (() => {
    //     switch (item.status) {
    //         case "waiting":
    //             return {
    //                 statusLabel: "대기중",
    //                 cls: "bg-zinc-100 text-zinc-700",
    //                 actionLabel: "검토시작",
    //             };
    //         case "progress":
    //             return {
    //                 statusLabel: "진행중",
    //                 cls: "bg-blue-50 text-blue-700",
    //                 actionLabel: "계속 작성",
    //             };
    //         case "done":
    //             return {
    //                 statusLabel: "완료",
    //                 cls: "bg-emerald-50 text-emerald-700",
    //                 actionLabel: "리뷰 보기",
    //             };
    //         case "expired":
    //             return {
    //                 statusLabel: "만료됨",
    //                 cls: "bg-rose-50 text-rose-700",
    //                 actionlabel: "기한 만료",
    //             };
    //         default:
    //             return { statusLabel: "", cls: "", actionLabel: "" };
    //     }
    // })();

    return (
        <div {...props}>
            <Card className={cn("rounded-lg border bg-white px-4 py-4 sm:px-5 sm:py-5", className)}>
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-sm bg-zinc-100" />
                            <p className="truncate text-sm font-medium text-slate-900">
                                {item.menteeName}
                            </p>
                        </div>

                        <p className="mt-1 text-xs text-slate-600">
                            <span className="font-medium">{item.company}</span> · {item.docType}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            요청 : {submitted} 마감 : {deadline}{" "}
                            {item.urgent && <span className="ml-1 text-rose-600">(기한 초과)</span>}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        {/* <span
                            className={cn(
                                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-black/5",
                                statusInfo.cls,
                            )}
                        >
                            {statusInfo.statusLabel}
                        </span> */}

                        <Button
                            variant={item.status === "expired" ? "outline" : "default"}
                            className={cn(
                                "h-8 rounded-md px-3 text-xs",
                                item.status === "expired"
                                    ? "bg-white"
                                    : "bg-[#2563EB] text-white hover:bg-[#1E4FD9]",
                            )}
                            onClick={() => onReviewClick?.(item)}
                            disabled={item.status === "expired"}
                        >
                            상세 보기
                        </Button>

                        {onMoreClick && (
                            <Button
                                variant="outline"
                                className="h-8 rounded-md px-3 text-xs"
                                onClick={() => onMoreClick(item)}
                            >
                                옵션
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};
