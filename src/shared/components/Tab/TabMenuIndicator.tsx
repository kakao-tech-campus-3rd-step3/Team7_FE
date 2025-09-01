export interface TabMenuIndicatorProps {
    value: number;
}

export const TabMenuIndicator = ({ value }: TabMenuIndicatorProps) => {
    return (
        <div className="w-5 h-5 rounded-full bg-red-500 grid place-items-center text-xs text-white">
            {value}
        </div>
    );
};
