import { useRef } from "react";

import { useCreateComment } from "@/features/document-feedback/services/createComment";

import { Spinner } from "@/shared/components/Spinner/Spinner";
import { Button } from "@/shared/ui/button";

export interface NewFeedbackCommentFormProps {
    documentId: number;
    coordinate: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    };
    position: {
        left: number;
        top: number;
    };
    onSuccess: () => void;
    onCancel: () => void;
    onError?: (error: unknown) => void;
}

export const NewFeedbackCommentForm = ({
    documentId,
    coordinate,
    position,
    onSuccess,
    onCancel,
    onError,
}: NewFeedbackCommentFormProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { isPending, mutate } = useCreateComment(documentId);

    const handleSubmit = () => {
        const content = textareaRef.current?.value;
        if (!content || !content.trim()) return;

        mutate({ content: content.trim(), coordinate }, { onSuccess, onError });
    };

    const handleCancel = () => {
        textareaRef.current!.value = "";
        onCancel();
    };
    return (
        <div
            className="absolute bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-[60]"
            style={{
                left: position.left,
                top: position.top,
                minWidth: "300px",
            }}
        >
            <textarea
                ref={textareaRef}
                name="content"
                placeholder="댓글을 입력하세요..."
                className="w-full h-20 p-2 border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                required
            />
            <div className="flex gap-2 mt-2">
                <Button
                    disabled={isPending}
                    onClick={handleSubmit}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isPending ? <Spinner /> : "작성"}
                </Button>
                <Button
                    onClick={handleCancel}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    취소
                </Button>
            </div>
        </div>
    );
};
