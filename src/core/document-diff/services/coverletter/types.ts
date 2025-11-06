export interface ApiEnvelope<T> {
    code: string;
    message: string;
    data: T;
}

export interface CoverLetterListItem {
    versionId: number;
    title: string;
    createdDate: string;
}

export interface CoverLetterListResponse {
    content: CoverLetterListItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface CoverLetterItem {
    question: string;
    answer: string;
    answerLimit: number;
}
export interface CoverLetterDetailResponse {
    title: string;
    coverLetterItems: CoverLetterItem[];
}
