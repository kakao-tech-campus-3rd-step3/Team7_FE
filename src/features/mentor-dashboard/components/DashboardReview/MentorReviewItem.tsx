import { useNavigate } from "react-router";

import type { MentorDashboardResponse } from "@/features/mentor-dashboard/services/getMentorDashboard";

import { Button } from "@/shared/ui/button";
import { formatDateToKrYMD } from "@/shared/utils/formatDate";

export type MentorReviewItemProps = MentorDashboardResponse;

export const MentorReviewItem = (props: MentorReviewItemProps) => {
    const navigate = useNavigate();

    const isExpired =
        formatDateToKrYMD(props.mentoringDueDate) < formatDateToKrYMD(new Date().toISOString());

    return (
        <article className="rounded-md border bg-white mb-2 p-4 flex justify-between">
            <header className="min-w-0">
                <h1 className="truncate text-sm font-medium text-slate-900">
                    {props.menteeName} · {props.documentTitle}
                </h1>
                <p className="mt-1 text-xs text-slate-600">
                    <span className="font-medium">{props.companyName}</span> · {props.documentType}
                </p>
                <p className="mt-1 text-xs text-slate-500">마감날짜 : {props.mentoringDueDate}</p>
            </header>

            <footer className="flex shrink-0 items-center gap-2">
                <Button
                    disabled={isExpired}
                    variant={isExpired ? "outline" : "default"}
                    onClick={() => navigate(`/mentee/feedback/${props.documentId}`)}
                >
                    상세 보기
                </Button>
            </footer>
        </article>
    );
};
