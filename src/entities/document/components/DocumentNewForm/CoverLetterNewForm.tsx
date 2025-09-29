import { useEffect, useId, useMemo, useState, useCallback } from "react";

import { Plus } from "lucide-react";

import { useGetCoverLetterByVersion } from "@/entities/document/service/useGetCoverLetterByVersion";

import { FormActions } from "@/shared/components/NewApplication/FormActions";

import {
    CoverLetterQuestionItem as CoverLetterQuestionItemComp,
    type CoverLetterQuestionItemModel,
} from "./CoverLetterQuestionItem";
import { VersionRadioList, type VersionRadioItem } from "./VersionRadioList";

export interface CoverLetterNewFormProps {
    titleLabel: string;
    titlePlaceholder?: string;
    submitText?: string;
    applicationId: string;
    versionItems?: VersionRadioItem[];
    onSubmit?: (payload: {
        title: string;
        baseVersionId?: string;
        questions: CoverLetterQuestionItemModel[];
    }) => void;
}

const makeNewQuestion = (): CoverLetterQuestionItemModel => ({
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
    applicationId,
    versionItems: externalVersionItems,
    onSubmit,
}: CoverLetterNewFormProps) => {
    const [editor, setEditor] = useState<{
        baseVersionId?: string;
        questions: CoverLetterQuestionItemModel[];
    }>({
        baseVersionId: undefined,
        questions: [makeNewQuestion()],
    });

    const [title, setTitle] = useState("");

    const versionItems: VersionRadioItem[] = useMemo(
        () =>
            externalVersionItems ?? [
                {
                    id: undefined,
                    title: "빈 문서에서 시작",
                    description: "처음부터 새로운 자기소개서를 작성합니다",
                },
                { id: "v12", title: "v1.2 - 최종본", date: "2024.01.20" },
                { id: "v11", title: "v1.1 - 1차 피드백 반영", date: "2024.01.18" },
                { id: "v10", title: "v1.0 - 초안", date: "2024.01.15" },
            ],
        [externalVersionItems],
    );

    const { data, isFetching, isError } = useGetCoverLetterByVersion(
        applicationId,
        editor.baseVersionId,
    );

    useEffect(() => {
        if (!data) return;
        const mapped: CoverLetterQuestionItemModel[] = data.coverLetterItems.map((it) => ({
            id: crypto.randomUUID(),
            label: it.question,
            value: it.answer ?? "",
            maxLength: it.answerLimit ?? 1000,
            isOpen: true,
        }));
        setEditor((prev) => ({
            ...prev,
            questions: mapped.length ? mapped : [makeNewQuestion()],
        }));
    }, [data]);

    const titleInputId = useId();

    const addQuestion = useCallback(
        () =>
            setEditor((prev) => ({
                ...prev,
                questions: [...prev.questions, makeNewQuestion()],
            })),
        [],
    );

    const patchQuestion = useCallback(
        (id: string, patch: Partial<CoverLetterQuestionItemModel>) =>
            setEditor((prev) => ({
                ...prev,
                questions: prev.questions.map((q) => (q.id === id ? { ...q, ...patch } : q)),
            })),
        [],
    );

    const toggleQuestion = useCallback(
        (id: string) =>
            setEditor((prev) => ({
                ...prev,
                questions: prev.questions.map((q) =>
                    q.id === id ? { ...q, isOpen: !q.isOpen } : q,
                ),
            })),
        [],
    );

    const deleteQuestion = useCallback((id: string) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        setEditor((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== id),
        }));
    }, []);

    const handleBaseVersionChange = useCallback((id: string | undefined) => {
        setEditor((prev) => ({
            baseVersionId: id,
            questions: id === undefined ? [makeNewQuestion()] : prev.questions,
        }));
    }, []);

    const totalWritten = useMemo(
        () => editor.questions.reduce((a, q) => a + q.value.length, 0),
        [editor.questions],
    );
    const totalMax = useMemo(
        () => editor.questions.reduce((a, q) => a + q.maxLength, 0),
        [editor.questions],
    );

    return (
        <form
            className="w-full"
            onSubmit={(e) => {
                e.preventDefault();
                if (!title.trim()) {
                    alert("제목을 입력하세요.");
                    return;
                }
                const overLimit = editor.questions.find((q) => q.value.length > q.maxLength);
                if (overLimit) {
                    alert("문항 답변이 허용 글자수를 초과했습니다. 확인 후 다시 저장해주세요.");
                    return;
                }
                if (!window.confirm("새 버전을 저장하시겠습니까?")) return;
                onSubmit?.({
                    title: title.trim(),
                    baseVersionId: editor.baseVersionId,
                    questions: editor.questions,
                });
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
                        value={editor.baseVersionId}
                        onChange={handleBaseVersionChange}
                    />
                    {isFetching && (
                        <p className="mt-2 text-xs text-gray-500" role="status" aria-live="polite">
                            이전 버전을 불러오는 중입니다...
                        </p>
                    )}
                    {isError && (
                        <p className="mt-2 text-xs text-red-600" role="alert">
                            이전 버전 불러오기에 실패했습니다. 다시 시도해 주세요.
                        </p>
                    )}
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
                        <p className="text-xs text-gray-500" aria-live="polite">
                            전체 {totalWritten}자 / {totalMax}자
                        </p>
                    </div>

                    <ul className="space-y-3">
                        {editor.questions.map((q, idx) => (
                            <CoverLetterQuestionItemComp
                                key={q.id}
                                item={q}
                                index={idx}
                                onPatch={patchQuestion}
                                onToggle={toggleQuestion}
                                onDelete={deleteQuestion}
                            />
                        ))}
                    </ul>

                    <div className="mt-3 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                        >
                            <Plus size={16} /> 문항 추가하기
                        </button>
                    </div>
                </div>

                <FormActions
                    disabled={!title.trim()}
                    submitText={submitText}
                    onTempSave={() => {
                        alert("임시 저장은 API 연동 후 제공될 예정입니다.");
                    }}
                />
            </div>
        </form>
    );
};
