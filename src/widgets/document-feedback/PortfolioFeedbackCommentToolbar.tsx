import { MessageSquarePlus, ZoomIn, ZoomOut } from "lucide-react";

import {
    CommentToolbar,
    CommentToolbarToggleItem,
    CommentToolbarButtonItem,
} from "@/core/document-commenter/components/CommentToolbar";

export interface PortfolioFeedbackCommentToolbarWidgetProps {
    onCommentModeToggle: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

export const PortfolioFeedbackCommentToolbarWidget = ({
    onCommentModeToggle,
    onZoomIn,
    onZoomOut,
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
            rightItems={[
                <CommentToolbarButtonItem
                    key="zoom-in"
                    tooltip="확대"
                    className="h-full w-5"
                    icon={<ZoomIn size={16} />}
                    onClick={onZoomIn}
                />,
                <CommentToolbarButtonItem
                    key="zoom-out"
                    tooltip="축소"
                    className="h-full w-5"
                    icon={<ZoomOut size={16} />}
                    onClick={onZoomOut}
                />,
            ]}
        />
    );
};
