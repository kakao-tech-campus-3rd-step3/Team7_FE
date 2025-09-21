import type { CoverLetterQuestionItem } from "./CoverLetterNewForm";

const STORAGE_KEY = "coverletter:draft";

export interface CoverLetterDraft {
    title?: string;
    baseVersionId?: string;
    questions?: CoverLetterQuestionItem[];
}

export function loadCoverLetterDraft(): CoverLetterDraft {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw) as CoverLetterDraft;
        return parsed ?? {};
    } catch {
        return {};
    }
}

export function saveCoverLetterDraft(draft: CoverLetterDraft): void {
    if (typeof window === "undefined" || !("localStorage" in window)) return;
    try {
        const sanitized =
            draft?.questions
                ? { ...draft, questions: draft.questions.map(({ isOpen, ...q }) => q) }
                : draft;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    } catch {
        // TODO: 필요 시 사용자 알림/로그 수집 연동
    }
}

export function clearCoverLetterDraft(): void {
    localStorage.removeItem(STORAGE_KEY);
}
