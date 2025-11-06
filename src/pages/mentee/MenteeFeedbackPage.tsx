import { useMemo } from "react";

import { FileUser } from "lucide-react";

import { Tab, TabNavItem } from "@/shared/components/Tab";
import { TabItem } from "@/shared/components/Tab/TabItem";
import { TabMenuIndicator } from "@/shared/components/Tab/TabMenuIndicator";
import { TabNavBar } from "@/shared/components/Tab/TabNavBar";

import { PortfolioFeedbackWidget } from "@/widgets/document-feedback/PortfolioFeedbackWidget";

import { EventBusProvider } from "@/core/document-commenter/contexts/EventBusContext";
import { PanEventPlugin } from "@/core/document-commenter/plugins/PanEventPlugin";
import { SelectionEventPlugin } from "@/core/document-commenter/plugins/SelectionEventPlugin";

export default function MenteeFeedbackPage() {
    return (
        <>
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
                    <div>이력서 피드백 위젯</div>
                </TabItem>
                <TabItem menu="포트폴리오">
                    <EventBusProvider
                        eventBusPlugins={useMemo(
                            () => [new SelectionEventPlugin(), new PanEventPlugin()],
                            [],
                        )}
                    >
                        <PortfolioFeedbackWidget />
                    </EventBusProvider>
                </TabItem>
                <TabItem menu="자기소개서">
                    <div>자기소개서 피드백 위젯</div>
                </TabItem>
            </Tab>
        </>
    );
}
