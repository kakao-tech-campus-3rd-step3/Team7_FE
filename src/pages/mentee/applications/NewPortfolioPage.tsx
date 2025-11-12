import { useNavigate, useParams } from "react-router";

import { DocumentNewForm } from "@/entities/document/components/DocumentNewForm";
import { useGeneratePostPresignedUrl } from "@/entities/document/services/generatePostPresignedUrl";

import { toast } from "@/shared/lib/toast";

import { useQueryClient } from "@tanstack/react-query";

export default function NewPortfolioPage() {
    const navigate = useNavigate();
    const { applicationId } = useParams();
    const appId = applicationId ? Number(applicationId) : 0;
    const generatePresignedUrlMutation = useGeneratePostPresignedUrl();
    const queryClient = useQueryClient();

    const handleSubmit = async (payload: { title: string; files: File[] }) => {
        if (!appId) {
            toast.error("지원서 ID가 없습니다.");
            return;
        }

        if (payload.files.length === 0) {
            toast.error("파일을 업로드해주세요.");
            return;
        }

        try {
            for (const file of payload.files) {
                const presignedData = await generatePresignedUrlMutation.mutateAsync({
                    applicationId: appId,
                    attachmentFileType: "PORTFOLIO",
                    body: {
                        documentTitle: payload.title || file.name,
                        fileName: file.name.replace(/[^a-zA-Z0-9.-]/g, "_"),
                        fileType: file.type || "application/pdf",
                    },
                });

                const uploadResponse = await fetch(presignedData.presignedUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type || "application/pdf",
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error(`파일 업로드 실패: ${file.name} (${uploadResponse.status})`);
                }
            }

            await new Promise((resolve) => setTimeout(resolve, 500));

            queryClient.invalidateQueries({
                queryKey: ["DOCUMENT", "FILES_BY_APP", appId, "PORTFOLIO"],
            });

            await queryClient.refetchQueries({
                queryKey: ["DOCUMENT", "FILES_BY_APP", appId, "PORTFOLIO"],
            });

            console.log("[쿼리 갱신 완료]");

            toast.success("포트폴리오가 업로드되었습니다.");
            navigate(-1);
        } catch (error) {
            console.error("[포트폴리오 업로드 실패]", error);
            toast.error(
                error instanceof Error
                    ? `포트폴리오 업로드에 실패했습니다: ${error.message}`
                    : "포트폴리오 업로드에 실패했습니다.",
            );
        }
    };

    return (
        <main className="mx-auto w-full max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <header className="mb-2 flex items-center gap-2">
                <button
                    type="button"
                    aria-label="뒤로가기"
                    onClick={() => navigate(-1)}
                    className="rounded-md px-2 py-1 text-lg text-gray-700 hover:bg-gray-100"
                >
                    ←
                </button>
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">새 포트폴리오 만들기</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        제목과 파일 업로드만 우선 제공합니다.
                    </p>
                </div>
            </header>

            <DocumentNewForm
                titleLabel="버전 제목"
                submitText={
                    generatePresignedUrlMutation.isPending ? "업로드 중..." : "새 버전 저장"
                }
                isSubmitting={generatePresignedUrlMutation.isPending}
                onSubmit={handleSubmit}
            />
        </main>
    );
}
