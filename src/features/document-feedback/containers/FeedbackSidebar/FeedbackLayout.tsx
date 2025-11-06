export interface FeedbackLayoutProps {
    main: React.ReactNode;
    sidebar: React.ReactNode;
}

export const FeedbackLayout = ({ main, sidebar }: FeedbackLayoutProps) => {
    return (
        <div className="flex h-full">
            <div className="flex-1 min-w-0 h-full border-r border-gray-200 overflow-hidden">
                {main}
            </div>
            <div className="w-[380px] h-full flex-shrink-0">{sidebar}</div>
        </div>
    );
};
