export interface FeedbackLayoutProps {
    main: React.ReactNode;
    sidebar: React.ReactNode;
}

export const FeedbackLayout = ({ main, sidebar }: FeedbackLayoutProps) => {
    return (
        <div className="flex h-full">
            <div className="w-full h-full border-r border-gray-200 overflow-hidden">{main}</div>
            <div className="flex-1 w-[380px] h-full flex-shrink-0">{sidebar}</div>
        </div>
    );
};
