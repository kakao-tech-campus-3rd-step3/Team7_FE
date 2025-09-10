import { NavLink, useLocation, useParams, generatePath } from "react-router-dom";

import { FileText, BookText, FolderClosed } from "lucide-react";

import { DocumentList } from "@/entities/document/components/DocumentList";

import { Tab } from "@/shared/components/Tab/Tab";
import { TabItem } from "@/shared/components/Tab/TabItem";
import { TabNavBar } from "@/shared/components/Tab/TabNavBar";
import { TabNavItem } from "@/shared/components/Tab/TabNavItem";

const TABS = [
    { label: "이력서", icon: <FileText size={16} />, slug: "resumes" },
    { label: "자기소개서", icon: <BookText size={16} />, slug: "coverletters" },
    { label: "포트폴리오", icon: <FolderClosed size={16} />, slug: "portfolios" },
];

const getActiveMenuByPath = (pathname: string) => {
    if (pathname.includes("/coverletters")) return "자기소개서";
    if (pathname.includes("/portfolios")) return "포트폴리오";
    return "이력서";
};

export const ApplicationsDocumentsWidget = () => {
    const { applicationId } = useParams();
    const { pathname } = useLocation();
    const activeMenu = getActiveMenuByPath(pathname);

    return (
        <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Tab key={activeMenu} defaultActiveTab={activeMenu}>
                <TabNavBar>
                    {TABS.map(({ label, icon, slug }) => {
                        const to = generatePath("/mentee/applications/:applicationId/:slug", {
                            applicationId: String(applicationId),
                            slug,
                        });
                        return (
                            <NavLink key={slug} to={to} replace className="inline-flex">
                                <TabNavItem icon={icon} label={label} indicator={null} />
                            </NavLink>
                        );
                    })}
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
