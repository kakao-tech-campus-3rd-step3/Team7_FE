import { memo, useMemo, useRef, useEffect } from "react";

import { ChevronDown, ChevronRight, Trash } from "lucide-react";

export interface CoverLetterQuestionItemModel {
    id: string;
    label: string;
    maxLength: number;
    value: string;
    isOpen?: boolean;
}

export interface CoverLetterQuestionItemProps {
    item: CoverLetterQuestionItemModel;
    index: number;
    onPatch: (id: string, patch: Partial<CoverLetterQuestionItemModel>) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const CoverLetterQuestionItem = memo(function CoverLetterQuestionItem({
    item,
    index,
    onPatch,
    onToggle,
    onDelete,
}: CoverLetterQuestionItemProps) {
    const isOpen = item.isOpen === true;

    const ids = useMemo(
        () => ({
            content: `q-content-${item.id}`,
            labelInput: `q-label-${item.id}`,
            maxInput: `q-max-${item.id}`,
        }),
        [item.id],
    );

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        if (!buttonRef.current) return;
        buttonRef.current.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }, [isOpen]);

    const count = item.value.length;
    const over = count > item.maxLength;

    return (
        <li className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                    <button
                        ref={buttonRef}
                        type="button"
                        onClick={() => onToggle(item.id)}
                        aria-label={isOpen ? "문항 접기" : "문항 펼치기"}
                        aria-controls={ids.content}
                        className="grid size-6 place-items-center rounded hover:bg-gray-100"
                    >
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    <div className="grid size-6 place-items-center rounded-full bg-green-100 text-green-600">
                        <span className="text-xs font-semibold">{index + 1}</span>
                    </div>

                    <label htmlFor={ids.labelInput} className="sr-only">
                        문항 제목
                    </label>
                    <input
                        id={ids.labelInput}
                        value={item.label}
                        onChange={(e) => onPatch(item.id, { label: e.target.value })}
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
                        {count} / {item.maxLength}자
                    </div>
                    <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
                        aria-label="문항 삭제"
                    >
                        <Trash size={14} />
                        삭제
                    </button>
                </div>
            </div>

            <div id={ids.content} hidden={!isOpen} aria-hidden={!isOpen}>
                <textarea
                    value={item.value}
                    onChange={(e) => onPatch(item.id, { value: e.target.value })}
                    maxLength={item.maxLength}
                    rows={10}
                    className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 min-h-40 md:min-h-56 lg:min-h-72"
                    placeholder="문항에 대한 내용을 입력하세요."
                    aria-label={`${index + 1}번 문항 내용`}
                />
                <div className="mt-2 flex items-center gap-2">
                    <label htmlFor={ids.maxInput} className="text-xs text-gray-600">
                        최대 글자수
                    </label>
                    <input
                        id={ids.maxInput}
                        type="number"
                        min={1}
                        value={item.maxLength}
                        onChange={(e) =>
                            onPatch(item.id, { maxLength: Number(e.target.value || 1) })
                        }
                        aria-label="최대 글자수"
                        className="w-24 rounded-md border px-2 py-1 text-sm text-right"
                    />
                </div>
            </div>

            {!isOpen && item.value && (
                <p className="truncate text-xs text-gray-500">{item.value.replace(/\s+/g, " ")}</p>
            )}
        </li>
    );
});
