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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function clearCoverLetterDraft(): void {
    localStorage.removeItem(STORAGE_KEY);
}
