import { useTabContext } from "@/shared/components/Tab/TabContext";

export interface TabItemProps {
    menu: string;
    children: React.ReactNode;
}

export const TabItem = ({ menu, children }: TabItemProps) => {
    const { activeTab } = useTabContext();
    if (activeTab !== menu) return null;
    return children;
};
