import { Fragment, useCallback, useState } from "react";
import { useParams } from "react-router";

import { NewFeedbackCommentForm } from "@/features/document-feedback/containers/FeedbackComment/NewFeedbackCommentForm";

import { CommentArea } from "@/core/document-commenter/components/Comment/CommentArea";
import type { EventTypes } from "@/core/document-commenter/events/EventTypes";
import { useEventBusSubscription } from "@/core/document-commenter/hooks/useEventBusSubscription";

export const NewFeedbackComment = () => {
    const { id } = useParams();
    const [newCommentPosition, setNewCommentPosition] = useState<
        EventTypes["selection:end"] | null
    >(null);

    const [isWriting, setIsWriting] = useState(false);

    useEventBusSubscription(
        "selection:end",
        useCallback((event) => {
            setNewCommentPosition({
                start: event.start,
                end: event.end,
            });
            setIsWriting(true);
        }, []),
    );

    const handleSuccess = useCallback(() => {
        setIsWriting(false);
        setNewCommentPosition(null);
    }, []);

    const handleCancel = useCallback(() => {
        setNewCommentPosition(null);
        setIsWriting(false);
    }, []);

    if (!newCommentPosition) return null;

    return (
        <Fragment>
            <CommentArea
                id={-1}
                borderColor="#F6B13B"
                backgroundColor="#F6B13B33"
                style={{}}
                status="pending"
                content=""
                startX={newCommentPosition.start.x}
                startY={newCommentPosition.start.y}
                endX={newCommentPosition.end.x}
                endY={newCommentPosition.end.y}
            />
            {isWriting && (
                <NewFeedbackCommentForm
                    documentId={Number(id)}
                    coordinate={{
                        startX: newCommentPosition.start.x,
                        startY: newCommentPosition.start.y,
                        endX: newCommentPosition.end.x,
                        endY: newCommentPosition.end.y,
                    }}
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                    position={{
                        left: newCommentPosition.end.x + 10,
                        top: newCommentPosition.start.y,
                    }}
                />
            )}
        </Fragment>
    );
};
