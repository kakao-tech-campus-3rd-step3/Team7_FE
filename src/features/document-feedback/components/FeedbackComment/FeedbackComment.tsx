export interface FeedbackCommentProps {
    author: string;
    authorAvatarUrl?: string;
    content: string;
    createdAt: string;
}

export const FeedbackComment = ({
    author,
    authorAvatarUrl,
    content,
    createdAt,
}: FeedbackCommentProps) => {
    return (
        <article className="border border-gray-200 flex p-3 rounded-md hover:cursor-pointer">
            <img
                src={authorAvatarUrl}
                alt={author}
                className="rounded-full block w-8 h-8 object-cover mr-1"
                width={32}
                height={32}
            />

            <div className="ml-2 w-full">
                <h3 className="my-0.5 font-semibold">{author}</h3>
                <p className="text-[#4B5563] text-sm leading-[1.2]">{content}</p>
                <time className="text-xs text-[#9CA3AF]">{createdAt}</time>
            </div>
        </article>
    );
};
