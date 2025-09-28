import { useQuery } from "@tanstack/react-query";

export interface CoverLetterItem {
    question: string;
    answer?: string | null;
    answerLimit?: number | null;
}

export interface CoverLetterVersionData {
    title: string;
    coverLetterItems: CoverLetterItem[];
}

async function fetchCoverLetterByVersion(_applicationId: string, versionId: string) {
    await new Promise((r) => setTimeout(r, 400));
    if (versionId === "v12") {
        return {
            title: "라인 신입 백엔드 개발자 자기소개서2",
            coverLetterItems: [
                {
                    question: "지원 동기에 대해 서술하시오.",
                    answer: "라인의 기술력에 매료되어...",
                    answerLimit: 1000,
                },
                {
                    question: "협업 경험에 대해 서술하시오.",
                    answer: "팀 프로젝트에서 Git을 활용하여...",
                    answerLimit: 1000,
                },
            ],
        } satisfies CoverLetterVersionData;
    }
    return { title: "빈 문서", coverLetterItems: [] } satisfies CoverLetterVersionData;
}

export function useGetCoverLetterByVersion(applicationId?: string, versionId?: string) {
    const enabled = Boolean(applicationId && versionId);

    const query = useQuery({
        queryKey: ["COVERLETTER", applicationId, versionId],
        queryFn: () => fetchCoverLetterByVersion(applicationId!, versionId!),
        enabled,
    });

    return {
        data: query.data,
        isFetching: query.isFetching,
        isError: query.isError,
    };
}
