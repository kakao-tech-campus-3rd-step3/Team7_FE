import { TabContextProvider } from "@/shared/components/Tab/TabContext";

export interface TabProps {
    defaultActiveTab: string;
    children: React.ReactNode;
}

export const Tab = ({ defaultActiveTab, children }: TabProps) => {
    return <TabContextProvider defaultActiveTab={defaultActiveTab}>{children}</TabContextProvider>;
};
