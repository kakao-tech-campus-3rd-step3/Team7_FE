import { MessageSquarePlus } from "lucide-react";

import {
    CommentToolbar,
    CommentToolbarToggleItem,
} from "@/core/document-commenter/components/CommentToolbar";

export interface PortfolioFeedbackCommentToolbarWidgetProps {
    onCommentModeToggle: () => void;
}

export const PortfolioFeedbackCommentToolbarWidget = ({
    onCommentModeToggle,
}: PortfolioFeedbackCommentToolbarWidgetProps) => {
    return (
        <CommentToolbar
            leftItems={[
                <CommentToolbarToggleItem
                    key="comment-mode"
                    tooltip="댓글 추가"
                    icon={<MessageSquarePlus />}
                    onToggle={onCommentModeToggle}
                />,
            ]}
            rightItems={[]}
        />
    );
};
