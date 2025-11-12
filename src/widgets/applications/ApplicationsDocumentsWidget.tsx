import { useMemo } from "react";
import { NavLink, useLocation, useParams, generatePath, useNavigate } from "react-router-dom";

import { FileText, BookText, FolderClosed } from "lucide-react";

import { DocumentList } from "@/entities/document/components/DocumentList";
import { useCoverLetterList } from "@/entities/document/services/coverLetter";
import { useDeleteAttachmentFile } from "@/entities/document/services/deleteAttachmentFile";
import { useDeleteCoverLetter } from "@/entities/document/services/deleteCoverLetter";
import { useFileMetaDataListByApplicationId } from "@/entities/document/services/getFileMetaDataListByApplicationId";

import { Tab } from "@/shared/components/Tab/Tab";
import { TabItem } from "@/shared/components/Tab/TabItem";
import { TabNavBar } from "@/shared/components/Tab/TabNavBar";
import { TabNavItem } from "@/shared/components/Tab/TabNavItem";
import { toast } from "@/shared/lib/toast";

type Version = { id: string; title: string; description: string; date: string };

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

    const navigate = useNavigate();
    const appId = applicationId ? Number(applicationId) : 0;

    const { data: resumeData, isLoading: isLoadingResumes } = useFileMetaDataListByApplicationId(
        appId,
        "RESUME",
        0,
        100,
        !!appId,
    );

    const { data: portfolioData, isLoading: isLoadingPortfolios } =
        useFileMetaDataListByApplicationId(appId, "PORTFOLIO", 0, 100, !!appId);

    const { data: coverLetterData, isLoading: isLoadingCoverLetters } = useCoverLetterList(
        appId,
        0,
        100,
        !!appId,
    );

    const deleteAttachmentMutation = useDeleteAttachmentFile();
    const deleteCoverLetterMutation = useDeleteCoverLetter();

    const resumeVersions: Version[] = useMemo(() => {
        if (!resumeData?.content) return [];
        return resumeData.content.map((file) => ({
            id: String(file.id),
            title: file.documentTitle,
            description: file.originalFileName,
            date: new Date().toLocaleDateString("ko-KR"),
        }));
    }, [resumeData]);

    const portfolioVersions: Version[] = useMemo(() => {
        if (!portfolioData?.content) return [];
        return portfolioData.content.map((file) => ({
            id: String(file.id),
            title: file.documentTitle,
            description: file.originalFileName,
            date: new Date().toLocaleDateString("ko-KR"),
        }));
    }, [portfolioData]);

    const coverVersions: Version[] = useMemo(() => {
        if (!coverLetterData?.content) return [];
        return coverLetterData.content.map((item) => ({
            id: String(item.versionId),
            title: item.title,
            description: "",
            date: new Date(item.createdDate).toLocaleDateString("ko-KR"),
        }));
    }, [coverLetterData]);

    const paths = useMemo(() => {
        return TABS.reduce<Record<string, string>>((acc, t) => {
            acc[t.label] = generatePath("/mentee/applications/:applicationId/:slug", {
                applicationId: String(applicationId),
                slug: t.slug,
            });
            return acc;
        }, {});
    }, [applicationId]);

    const handleDeleteAttachment = (id: string) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        if (!appId) return;

        deleteAttachmentMutation.mutate(
            {
                applicationId: appId,
                attachmentFileId: Number(id),
            },
            {
                onSuccess: () => {
                    toast.success("삭제되었습니다.");
                },
                onError: () => {
                    toast.error("삭제에 실패했습니다.");
                },
            },
        );
    };

    const handleDeleteCoverLetter = (id: string) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        if (!appId) return;

        deleteCoverLetterMutation.mutate(
            {
                applicationId: appId,
                documentId: Number(id),
            },
            {
                onSuccess: () => {
                    toast.success("삭제되었습니다.");
                },
                onError: () => {
                    toast.error("삭제에 실패했습니다.");
                },
            },
        );
    };

    return (
        <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Tab key={activeMenu} defaultActiveTab={activeMenu}>
                <TabNavBar>
                    {TABS.map(({ label, icon, slug }) => (
                        <NavLink key={slug} to={paths[label]} replace className="inline-flex">
                            <TabNavItem icon={icon} label={label} indicator={null} />
                        </NavLink>
                    ))}
                </TabNavBar>

                <div className="p-4">
                    <TabItem menu="이력서">
                        <DocumentList
                            title="이력서"
                            versions={isLoadingResumes ? [] : resumeVersions}
                            onCreateVersion={() =>
                                navigate(`/mentee/applications/${applicationId}/resumes/new`)
                            }
                            onViewVersion={(id) => {
                                navigate(`/mentee/feedback/${id}`);
                            }}
                            onDeleteVersion={handleDeleteAttachment}
                        />
                    </TabItem>

                    <TabItem menu="자기소개서">
                        <DocumentList
                            title="자기소개서"
                            versions={isLoadingCoverLetters ? [] : coverVersions}
                            onCreateVersion={() =>
                                navigate(`/mentee/applications/${applicationId}/coverletters/new`)
                            }
                            onViewVersion={(id) => {
                                navigate(`/mentee/feedback/${id}`);
                            }}
                            onDeleteVersion={handleDeleteCoverLetter}
                        />
                    </TabItem>

                    <TabItem menu="포트폴리오">
                        <DocumentList
                            title="포트폴리오"
                            versions={isLoadingPortfolios ? [] : portfolioVersions}
                            onCreateVersion={() =>
                                navigate(`/mentee/applications/${applicationId}/portfolios/new`)
                            }
                            onViewVersion={(id) => {
                                navigate(`/mentee/feedback/${id}`);
                            }}
                            onDeleteVersion={handleDeleteAttachment}
                        />
                    </TabItem>
                </div>
            </Tab>
        </section>
    );
};
