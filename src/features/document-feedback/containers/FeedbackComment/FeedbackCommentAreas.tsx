import { useParams } from "react-router";

import { useGetComments } from "@/features/document-feedback/services/getComments";

import { CommentArea } from "@/core/document-commenter/components/Comment";

export const FeedbackCommentAreas = () => {
    const { id } = useParams();
    const { data } = useGetComments(Number(id));

    return (
        <div className="absolute z-50 top-0 left-0">
            {data.content.map((comment) => {
                return (
                    <CommentArea
                        key={comment.id}
                        borderColor="#F6B13B"
                        backgroundColor="#F6B13B33"
                        style={{}}
                        status={"success"}
                        id={comment.id}
                        content={comment.content}
                        startX={comment.coordinate.startX}
                        startY={comment.coordinate.startY}
                        endX={comment.coordinate.endX}
                        endY={comment.coordinate.endY}
                    />
                );
            })}
        </div>
    );
};
