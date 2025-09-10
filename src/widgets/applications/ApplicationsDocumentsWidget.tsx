import { FileText, BookText, FolderClosed } from "lucide-react";

import { DocumentList } from "@/entities/document/components/DocumentList";

import { Tab } from "@/shared/components/Tab/Tab";
import { TabItem } from "@/shared/components/Tab/TabItem";
import { TabNavBar } from "@/shared/components/Tab/TabNavBar";
import { TabNavItem } from "@/shared/components/Tab/TabNavItem";

export const ApplicationsDocumentsWidget = () => {
    return (
        <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Tab defaultActiveTab="이력서">
                <TabNavBar>
                    <TabNavItem icon={<FileText size={16} />} label="이력서" indicator={null} />
                    <TabNavItem icon={<BookText size={16} />} label="자기소개서" indicator={null} />
                    <TabNavItem
                        icon={<FolderClosed size={16} />}
                        label="포트폴리오"
                        indicator={null}
                    />
                </TabNavBar>

                <div className="p-4">
                    <TabItem menu="이력서">
                        <DocumentList
                            title="이력서"
                            versions={[
                                {
                                    id: "1",
                                    title: "v1.2",
                                    description: "최종본",
                                    date: "2024.01.20",
                                },
                                {
                                    id: "2",
                                    title: "v1.1",
                                    description: "1차 피드백 반영",
                                    date: "2024.01.18",
                                },
                                { id: "3", title: "v1.0", description: "초안", date: "2024.01.15" },
                            ]}
                            onCreateVersion={() => alert("이력서 새 버전")}
                            onViewVersion={(id) => alert(`이력서 보기: ${id}`)}
                            onDeleteVersion={(id) => alert(`이력서 삭제: ${id}`)}
                        />
                    </TabItem>

                    <TabItem menu="자기소개서">
                        <DocumentList
                            title="자기소개서"
                            versions={[
                                {
                                    id: "1",
                                    title: "최종본",
                                    description: "3일 전",
                                    date: "2025.09.01",
                                },
                                {
                                    id: "2",
                                    title: "1차 피드백 반영",
                                    description: "7일 전",
                                    date: "2025.08.28",
                                },
                                {
                                    id: "3",
                                    title: "초안",
                                    description: "10일 전",
                                    date: "2025.08.23",
                                },
                            ]}
                            onCreateVersion={() => alert("자기소개서 새 버전")}
                            onViewVersion={(id) => alert(`자기소개서 보기: ${id}`)}
                            onDeleteVersion={(id) => alert(`자기소개서 삭제: ${id}`)}
                        />
                    </TabItem>

                    <TabItem menu="포트폴리오">
                        <DocumentList
                            title="포트폴리오"
                            versions={[
                                {
                                    id: "1",
                                    title: "최종본",
                                    description: "어제 수정",
                                    date: "2025.09.06",
                                },
                                {
                                    id: "2",
                                    title: "프로젝트 보강",
                                    description: "5일 전",
                                    date: "2025.09.02",
                                },
                                {
                                    id: "3",
                                    title: "초안",
                                    description: "2주 전",
                                    date: "2025.08.23",
                                },
                            ]}
                            onCreateVersion={() => alert("포트폴리오 새 버전")}
                            onViewVersion={(id) => alert(`포트폴리오 보기: ${id}`)}
                            onDeleteVersion={(id) => alert(`포트폴리오 삭제: ${id}`)}
                        />
                    </TabItem>
                </div>
            </Tab>
        </section>
    );
};
