import { User } from "lucide-react";

import { Tab, TabNavBar, TabNavItem, TabItem } from "@/shared/components/Tab";

import type { MentorProfile } from "../../models/types";
import { MentorProfileIntroTab } from "./MentorProfileIntroTab";

export interface MentorProfileTabsProps {
    profile: MentorProfile;
    onSave: (partial: Partial<MentorProfile>) => Promise<void> | void;
    isSaving?: boolean;
}

export function MentorProfileTabs({ profile, onSave, isSaving }: MentorProfileTabsProps) {
    return (
        <Tab defaultActiveTab="소개">
            <TabNavBar>
                <TabNavItem icon={<User size={16} />} label="소개" />
            </TabNavBar>

            <TabItem menu="소개">
                <MentorProfileIntroTab
                    profile={profile}
                    onChange={onSave}
                    isSaving={isSaving}
                    className="mt-4"
                />
            </TabItem>
        </Tab>
    );
}
