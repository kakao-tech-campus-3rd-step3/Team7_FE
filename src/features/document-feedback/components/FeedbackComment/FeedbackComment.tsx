import { useParams } from "react-router";

import { Trash } from "lucide-react";

import { useDeleteComment } from "@/features/document-feedback/services/deleteComment";

export interface FeedbackCommentProps {
    id: number;
    author: string;

    content: string;
    createdAt: string;
}

export const FeedbackComment = ({
    id,
    author,

    content,
    createdAt,
}: FeedbackCommentProps) => {
    const { id: documentId } = useParams();

    const { mutate } = useDeleteComment(Number(documentId), id);

    return (
        <li className="border border-gray-200 flex p-3 rounded-md hover:cursor-pointer">
            <div className="ml-2 w-full">
                <h3 className="my-0.5 font-semibold">{author}</h3>
                <p className="text-[#4B5563] text-sm leading-[1.2]">{content}</p>
                <time className="text-xs text-[#9CA3AF]">{createdAt}</time>
            </div>

            <button onClick={() => mutate()}>
                <Trash size={14} color="red" />
            </button>
        </li>
    );
};
