import { useEffect, useId, useMemo, useState } from "react";

import { Plus, Trash, ChevronDown, ChevronRight } from "lucide-react";

import { FormActions } from "@/shared/components/NewApplication/FormActions";

import { VersionRadioList, type VersionRadioItem } from "./VersionRadioList";

export interface CoverLetterQuestionItem {
    id: string;
    label: string;
    maxLength: number;
    value: string;
    isOpen?: boolean;
}

export interface CoverLetterNewFormProps {
    titleLabel: string;
    titlePlaceholder?: string;
    submitText?: string;
    onSubmit?: (payload: {
        title: string;
        baseVersionId?: string;
        questions: CoverLetterQuestionItem[];
    }) => void;
}

const STORAGE_KEY = "coverletter:draft";

const makeNewQuestion = (): CoverLetterQuestionItem => ({
    id: crypto.randomUUID(),
    label: "새 문항",
    maxLength: 500,
    value: "",
    isOpen: true,
});

export const CoverLetterNewForm = ({
    titleLabel,
    titlePlaceholder = "예: 2차 피드백 반영, 최종 완성본 등",
    submitText = "새 버전 저장",
    onSubmit,
}: CoverLetterNewFormProps) => {
    const [title, setTitle] = useState("");
    const [baseVersionId, setBaseVersionId] = useState<string | undefined>(undefined);
    const [questions, setQuestions] = useState<CoverLetterQuestionItem[]>([makeNewQuestion()]);

    const versionItems: VersionRadioItem[] = useMemo(
        () => [
            {
                id: undefined,
                title: "빈 문서에서 시작",
                description: "처음부터 새로운 자기소개서를 작성합니다",
            },
            { id: "v12", title: "v1.2 - 최종본", date: "2024.01.20" },
            { id: "v11", title: "v1.1 - 1차 피드백 반영", date: "2024.01.18" },
            { id: "v10", title: "v1.0 - 초안", date: "2024.01.15" },
        ],
        [],
    );

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        try {
            const parsed = JSON.parse(raw) as {
                title?: string;
                baseVersionId?: string;
                questions?: CoverLetterQuestionItem[];
            };
            if (parsed.title) setTitle(parsed.title);
            if (parsed.baseVersionId !== undefined) setBaseVersionId(parsed.baseVersionId);
            if (parsed.questions?.length) {
                setQuestions(parsed.questions.map((q) => ({ ...q, isOpen: q.isOpen ?? true })));
            }
        } catch {
            // ignore
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, baseVersionId, questions }));
    }, [title, baseVersionId, questions]);

    const totalWritten = questions.reduce((a, q) => a + q.value.length, 0);
    const totalMax = questions.reduce((a, q) => a + q.maxLength, 0);
    const disabled = !title.trim();
    const titleInputId = useId();

    const addQuestion = () => setQuestions((prev) => [...prev, makeNewQuestion()]);
    const patchQuestion = (id: string, patch: Partial<CoverLetterQuestionItem>) =>
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));
    const toggleQuestion = (id: string) =>
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, isOpen: !q.isOpen } : q)));
    const deleteQuestion = (id: string) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };
    const expandAll = () => setQuestions((prev) => prev.map((q) => ({ ...q, isOpen: true })));
    const collapseAll = () => setQuestions((prev) => prev.map((q) => ({ ...q, isOpen: false })));

    const handlePickVersion = (id: string | undefined) => {
        setBaseVersionId(id);
        if (id === undefined) {
            const onlyOne = [makeNewQuestion()];
            setQuestions(onlyOne);
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    title: title.trim(),
                    baseVersionId: undefined,
                    questions: onlyOne,
                }),
            );
        }
    };

    return (
        <form
            className="w-full"
            onSubmit={(e) => {
                e.preventDefault();
                if (!window.confirm("새 버전을 저장하시겠습니까?")) return;
                onSubmit?.({ title: title.trim(), baseVersionId, questions });
                localStorage.removeItem(STORAGE_KEY);
            }}
        >
            <div className="mx-auto w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl px-6 pt-0 pb-6">
                <header className="mb-4 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="rounded-md px-2 py-1 text-lg text-gray-700 hover:bg-gray-100"
                        aria-label="이전 페이지로 이동"
                        title="이전 페이지로 이동"
                    >
                        ←
                    </button>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">
                            새 자기소개서 버전 만들기
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            버전을 선택해 시작하거나, 빈 문서에서 시작할 수 있습니다.
                        </p>
                    </div>
                </header>

                <div className="mb-6 rounded-lg border border-gray-200 bg-white px-6 py-5">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        어떤 버전의 내용을 기준으로 작성하시겠습니까?
                    </h3>
                    <VersionRadioList
                        title=""
                        items={versionItems}
                        value={baseVersionId}
                        onChange={handlePickVersion}
                    />
                </div>

                <div className="rounded-lg border border-gray-200 bg-white px-6 py-5">
                    <div className="mb-6">
                        <label
                            htmlFor={titleInputId}
                            className="mb-1 block text-sm font-medium text-gray-800"
                        >
                            {titleLabel}
                        </label>
                        <input
                            id={titleInputId}
                            type="text"
                            placeholder={titlePlaceholder}
                            aria-label={titleLabel}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">자기소개서 문항</p>
                        <div className="flex items-center gap-3">
                            <p className="text-xs text-gray-500" aria-live="polite">
                                전체 {totalWritten}자 / {totalMax}자
                            </p>
                            <button
                                type="button"
                                onClick={expandAll}
                                className="text-xs text-gray-600 underline-offset-2 hover:underline"
                            >
                                전체 펼치기
                            </button>
                            <button
                                type="button"
                                onClick={collapseAll}
                                className="text-xs text-gray-600 underline-offset-2 hover:underline"
                            >
                                전체 접기
                            </button>
                        </div>
                    </div>

                    <ul className="space-y-3">
                        {questions.map((q, idx) => {
                            const isOpen = q.isOpen === true;
                            const contentId = `q-content-${q.id}`;
                            const labelInputId = `q-label-${q.id}`;
                            const maxInputId = `q-max-${q.id}`;
                            const count = q.value.length;
                            const over = count > q.maxLength;

                            return (
                                <li
                                    key={q.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4"
                                >
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-2">
                                            {isOpen ? (
                                                <button
                                                    type="button"
                                                    onClick={() => toggleQuestion(q.id)}
                                                    aria-label="문항 접기"
                                                    aria-expanded="true"
                                                    aria-controls={contentId}
                                                    className="grid size-6 place-items-center rounded hover:bg-gray-100"
                                                >
                                                    <ChevronDown size={16} />
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => toggleQuestion(q.id)}
                                                    aria-label="문항 펼치기"
                                                    aria-expanded="false"
                                                    aria-controls={contentId}
                                                    className="grid size-6 place-items-center rounded hover:bg-gray-100"
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            )}

                                            <div className="grid size-6 place-items-center rounded-full bg-green-100 text-green-600">
                                                <span className="text-xs font-semibold">
                                                    {idx + 1}
                                                </span>
                                            </div>

                                            <label htmlFor={labelInputId} className="sr-only">
                                                문항 제목
                                            </label>
                                            <input
                                                id={labelInputId}
                                                value={q.label}
                                                onChange={(e) =>
                                                    patchQuestion(q.id, { label: e.target.value })
                                                }
                                                placeholder="문항 제목을 입력하세요"
                                                aria-label="문항 제목"
                                                className="min-w-0 flex-1 truncate rounded border border-transparent px-1 py-0.5 text-sm focus:border-gray-300"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`text-xs ${over ? "text-red-600" : "text-gray-500"}`}
                                                aria-live="polite"
                                            >
                                                {count} / {q.maxLength}자
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => deleteQuestion(q.id)}
                                                className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
                                                aria-label="문항 삭제"
                                            >
                                                <Trash size={14} />
                                                삭제
                                            </button>
                                        </div>
                                    </div>

                                    {isOpen && (
                                        <div id={contentId}>
                                            <textarea
                                                value={q.value}
                                                onChange={(e) =>
                                                    patchQuestion(q.id, { value: e.target.value })
                                                }
                                                maxLength={q.maxLength}
                                                rows={10}
                                                className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 min-h-40 md:min-h-56 lg:min-h-72"
                                                placeholder="문항에 대한 내용을 입력하세요."
                                                aria-label={`${idx + 1}번 문항 내용`}
                                            />
                                            <div className="mt-2 flex items-center gap-2">
                                                <label
                                                    htmlFor={maxInputId}
                                                    className="text-xs text-gray-600"
                                                >
                                                    최대 글자수
                                                </label>
                                                <input
                                                    id={maxInputId}
                                                    type="number"
                                                    min={1}
                                                    value={q.maxLength}
                                                    onChange={(e) =>
                                                        patchQuestion(q.id, {
                                                            maxLength: Number(e.target.value || 1),
                                                        })
                                                    }
                                                    aria-label="최대 글자수"
                                                    className="w-24 rounded-md border px-2 py-1 text-sm text-right"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {!isOpen && q.value && (
                                        <p className="truncate text-xs text-gray-500">
                                            {q.value.replace(/\s+/g, " ")}
                                        </p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-3 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                        >
                            <Plus size={16} /> 문항 추가하기
                        </button>
                        <span />
                    </div>
                </div>

                <FormActions
                    disabled={disabled}
                    submitText={submitText}
                    onTempSave={() => {
                        localStorage.setItem(
                            STORAGE_KEY,
                            JSON.stringify({ title: title.trim(), baseVersionId, questions }),
                        );
                        alert("임시 저장되었습니다.");
                    }}
                />
            </div>
        </form>
    );
};
