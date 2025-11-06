import type { ReviewItem } from "./types";

export const mentorReviewMock: ReviewItem[] = [
    {
        id: "r1",
        menteeName: "김지훈",
        company: "삼성전자",
        docType: "이력서",
        submittedAt: "2024-10-20T14:30:00",
        deadline: "2024-11-22T00:00:00",
        urgent: false,
        status: "done",
    },
    {
        id: "r2",
        menteeName: "박미영",
        company: "네이버",
        docType: "자기소개서",
        submittedAt: "2024-10-18T10:15:00",
        deadline: "2024-11-25T00:00:00",
        urgent: false,
        status: "expired",
    },
    {
        id: "r3",
        menteeName: "이주홍",
        company: "카카오",
        docType: "포트폴리오",
        submittedAt: "2024-10-19T16:45:00",
        deadline: "2024-11-24T00:00:00",
        urgent: true,
        status: "progress",
    },
    {
        id: "r4",
        menteeName: "최동욱",
        company: "삼성SDS",
        docType: "포트폴리오",
        submittedAt: "2024-10-15T09:00:00",
        deadline: "2024-11-09T00:00:00",
        urgent: false,
        status: "waiting",
    },
];
