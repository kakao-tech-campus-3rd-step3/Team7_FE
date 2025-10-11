import { FileUser } from "lucide-react";

import { Tab, TabNavItem } from "@/shared/components/Tab";
import { TabItem } from "@/shared/components/Tab/TabItem";
import { TabMenuIndicator } from "@/shared/components/Tab/TabMenuIndicator";
import { TabNavBar } from "@/shared/components/Tab/TabNavBar";

import { CoverletterDiffWidget } from "@/widgets/document-diff/CoverletterDiffWidget";
import { PortfolioDiffWidget } from "@/widgets/document-diff/PortfolioDiffWidget";
import { ResumeDiffWidget } from "@/widgets/document-diff/ResumeDiffWidget";

import { installDocumentDiffStrategies } from "@/core/document-diff/installDocumentDiffStrategies";

installDocumentDiffStrategies();

export default function DocumentDiffPage() {
    return (
        <div className="p-6">
            <Tab defaultActiveTab="이력서">
                <TabNavBar>
                    <TabNavItem
                        icon={<FileUser size={16} />}
                        label="이력서"
                        indicator={<TabMenuIndicator value={0} />}
                    />
                    <TabNavItem
                        icon={<FileUser size={16} />}
                        label="포트폴리오"
                        indicator={<TabMenuIndicator value={0} />}
                    />
                    <TabNavItem
                        icon={<FileUser size={16} />}
                        label="자기소개서"
                        indicator={<TabMenuIndicator value={0} />}
                    />
                </TabNavBar>

                <TabItem menu="이력서">
                    <ResumeDiffWidget />
                </TabItem>

                <TabItem menu="포트폴리오">
                    <PortfolioDiffWidget />
                </TabItem>

                <TabItem menu="자기소개서">
                    <CoverletterDiffWidget />
                </TabItem>
            </Tab>
        </div>
    );
}
