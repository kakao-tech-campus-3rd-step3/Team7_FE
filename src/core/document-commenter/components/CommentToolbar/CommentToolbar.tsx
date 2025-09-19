export interface CommentToolbarProps {
    leftItems?: React.ReactNode;
    rightItems?: React.ReactNode;
}

export const CommentToolbar = ({ leftItems, rightItems }: CommentToolbarProps) => {
    return (
        <nav
            className="bg-[#F9FAFB] w-full h-12 border-gray-200 border-b flex justify-between px-4"
            aria-label="댓글 툴바"
        >
            <div className="w-full h-full flex items-center justify-start gap-0.5">
                <ul className="flex gap-1 h-full">{leftItems}</ul>
            </div>
            <div className="w-full h-full flex items-center justify-end gap-0.5">
                <ul className="flex gap-1 h-full">{rightItems}</ul>
            </div>
        </nav>
    );
};
