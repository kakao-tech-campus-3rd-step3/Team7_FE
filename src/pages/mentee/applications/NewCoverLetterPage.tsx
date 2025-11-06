import { useParams } from "react-router-dom";

import { CoverLetterNewForm } from "@/entities/document/components/DocumentNewForm/CoverLetterNewForm";
import { useRegisterCoverLetterByApplicationId } from "@/entities/document/services/coverLetter";

export default function NewCoverLetterPage() {
    const { applicationId: appIdParam } = useParams();
    const applicationId = Number(appIdParam);
    const registerMutation = useRegisterCoverLetterByApplicationId();

    return (
        <main className="mx-auto w-full max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <CoverLetterNewForm
                applicationId={String(applicationId)}
                titleLabel="버전 제목"
                submitText={registerMutation.isPending ? "저장 중…" : "새 자기소개서 저장"}
                onSubmit={(payload) => {
                    registerMutation.mutate(
                        {
                            applicationId,
                            body: {
                                title: payload.title,
                                coverLetterItems: payload.questions.map((q) => ({
                                    question: q.label,
                                    answer: q.value,
                                    answerLimit: q.maxLength,
                                })),
                            },
                        },
                        {
                            onSuccess: () => {
                                alert("자기소개서 버전이 저장되었습니다.");
                                history.back();
                            },
                            onError: (e) => {
                                console.error(e);
                                alert("저장에 실패했습니다.");
                            },
                        },
                    );
                }}
            />
        </main>
    );
}
