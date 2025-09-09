export interface CommentToolbarProps {
    leftItems?: React.ReactNode;
    rightItems?: React.ReactNode;
}

export const CommentToolbar = ({ leftItems, rightItems }: CommentToolbarProps) => {
    return (
        <nav className="bg-[#F9FAFB] w-full h-12 border-gray-300 flex justify-between px-2">
            <ul className="w-full h-full flex items-center gap-0.5">{leftItems}</ul>
            <ul className="w-full h-full flex items-center justify-end gap-0.5">{rightItems}</ul>
        </nav>
    );
};
