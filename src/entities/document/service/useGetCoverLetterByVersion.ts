import { useEffect, useState } from "react";

export interface CoverLetterItem {
    question: string;
    answer: string;
    answerLimit: number;
}

export interface CoverLetterVersionData {
    title: string;
    coverLetterItems: CoverLetterItem[];
}

export function useGetCoverLetterByVersion(applicationId?: string, versionId?: string) {
    const [data, setData] = useState<CoverLetterVersionData | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!applicationId || !versionId) return;

        setIsFetching(true);
        setIsError(false);

        const t = setTimeout(() => {
            try {
                if (versionId === "v12") {
                    setData({
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
                    });
                } else {
                    setData({ title: "빈 문서", coverLetterItems: [] });
                }
            } catch {
                setIsError(true);
            } finally {
                setIsFetching(false);
            }
        }, 500);

        return () => clearTimeout(t);
    }, [applicationId, versionId]);

    return { data, isFetching, isError };
}
