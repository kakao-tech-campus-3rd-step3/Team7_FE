import type { Section, ApplyCard } from "@/features/dashboard/models/types";

export const sectionMock: Record<Section, ApplyCard[]> = {
    planned: [
        {
            id: "c1",
            icon: undefined,
            company: "LG CNS",
            position: "클라우드 엔지니어",
            dday: "D-14",
        },
    ],
    writing: [
        {
            id: "c2",
            icon: undefined,
            company: "삼성전자",
            position: "DX부문 소프트웨어 개발",
            dday: "D-7",
        },
    ],
    submitted: [
        {
            id: "c3",
            icon: undefined,
            company: "네이버",
            position: "백엔드 개발자",
            dday: "D-3",
        },
    ],
    interview: [
        {
            id: "c4",
            icon: undefined,
            company: "카카오",
            position: "프론트엔드 개발자",
            dday: "D-21",
        },
    ],
};
