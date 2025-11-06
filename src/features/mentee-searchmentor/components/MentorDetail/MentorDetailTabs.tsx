import { UserRound, Star } from "lucide-react";

import { TabContextProvider, useTabContext } from "@/shared/components/Tab/TabContext";
import { TabNavItem } from "@/shared/components/Tab/TabNavItem";

import { MENTOR_TABS } from "../../models/constants";

export interface MentorDetailTabsProps {
    defaultTab?: (typeof MENTOR_TABS)[number];
    children: React.ReactNode;
}

export const MentorDetailTabs = ({ defaultTab = "소개", children }: MentorDetailTabsProps) => {
    return (
        <TabContextProvider<typeof MENTOR_TABS> defaultActiveTab={defaultTab}>
            <nav className="mt-4 rounded-t-xl border-b bg-white">
                <ul className="flex items-center gap-0">
                    <TabNavItem icon={<UserRound />} label="소개" />
                    <TabNavItem icon={<Star />} label="리뷰" />
                </ul>
            </nav>
            <div className="rounded-b-xl border-x border-b bg-white p-5">{children}</div>
        </TabContextProvider>
    );
};

export interface MentorTabPanelProps {
    when: (typeof MENTOR_TABS)[number];
    children: React.ReactNode;
}

export const MentorTabPanel = ({ when, children }: MentorTabPanelProps) => {
    const { activeTab } = useTabContext<typeof MENTOR_TABS>();
    if (activeTab !== when) return null;
    return <div>{children}</div>;
};
