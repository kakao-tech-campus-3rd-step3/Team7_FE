import { useTabContext } from "@/shared/components/Tab/TabContext";
import { cn } from "@/shared/lib/utils";

export interface TabNavItemProps {
    icon?: React.ReactNode;
    label: string;
    indicator?: React.ReactNode;
}

export const TabNavItem = ({ icon, label, indicator }: TabNavItemProps) => {
    const { activeTab, setActiveTab } = useTabContext();

    const active = activeTab === label;
    const colorByActiveState = cn(active ? "[&>svg]:text-primary text-primary" : "text-gray-400");

    return (
        <li
            role="tab"
            onClick={() => setActiveTab(label)}
            className={cn(
                "w-36 h-14 list-none flex items-center justify-center gap-2 border-b-2 cursor-pointer",
                active ? "border-primary bg-primary/20" : "border-transparent",
            )}
        >
            <div className={colorByActiveState}>{icon}</div>
            <p className={colorByActiveState}>{label}</p>
            <div>{indicator}</div>
        </li>
    );
};
