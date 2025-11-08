import { useParams } from "react-router";

import { FeedbackComment } from "@/features/document-feedback/components/FeedbackComment/FeedbackComment";
import { useGetComments } from "@/features/document-feedback/services/getComments";

export const FeedbackCommentList = () => {
    const { id } = useParams();
    const { data } = useGetComments(Number(id));

    return (
        <ul className="flex flex-col gap-2 overflow-y-scroll">
            {data.map((comment) => {
                return (
                    <FeedbackComment
                        id={comment.id}
                        author={comment.writerInfo.name}
                        content={comment.content}
                    />
                );
            })}
        </ul>
    );
};
