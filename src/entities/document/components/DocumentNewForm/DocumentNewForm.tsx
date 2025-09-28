import { useCallback, useId, useMemo, useState } from "react";

import { X } from "lucide-react";

import { FileDropzone } from "@/shared/components/NewApplication/FileDropzone";
import { FileIconByMimeType } from "@/shared/components/NewApplication/FileIconByMimeType";
import { FormActions } from "@/shared/components/NewApplication/FormActions";

export interface DocumentNewFormProps {
    titleLabel: string;
    titlePlaceholder?: string;
    submitText?: string;
    description?: string;
    accept?: string;
    multiple?: boolean;
    initialTitle?: string;
    initialFiles?: File[];
    isSubmitting?: boolean;
    onSubmit?: (payload: { title: string; files: File[] }) => void;
    onTempSave?: (payload: { title: string; files: File[] }) => void;
}

export const DocumentNewForm = ({
    titleLabel,
    titlePlaceholder = "예: 이력서 2차 수정본",
    submitText = "저장",
    description,
    accept,
    multiple = true,
    initialTitle = "",
    initialFiles = [],
    isSubmitting = false,
    onSubmit,
    onTempSave,
}: DocumentNewFormProps) => {
    const [title, setTitle] = useState(initialTitle);
    const [files, setFiles] = useState<File[]>(initialFiles);

    const titleId = useId();
    const dropHintId = useId();

    const hasTitle = title.trim().length > 0;
    const hasFiles = files.length > 0;
    const submitDisabled = isSubmitting || (!hasTitle && !hasFiles);

    const handleFiles = useCallback(
        (pickedList: FileList | null) => {
            if (isSubmitting) return;
            const picked = pickedList ? Array.from(pickedList) : [];
            if (picked.length === 0) return;
            setFiles((prev) => (multiple ? [...prev, ...picked] : [picked[0]]));
        },
        [isSubmitting, multiple],
    );

    const removeFile = useCallback((name: string, size: number) => {
        setFiles((prev) => prev.filter((f) => !(f.name === name && f.size === size)));
    }, []);

    const totalSize = useMemo(() => files.reduce((acc, f) => acc + f.size, 0), [files]);

    const fileList = useMemo(
        () =>
            files.map((f) => ({
                key: `${f.name}-${f.size}-${f.lastModified}`,
                name: f.name,
                size: f.size,
                ext: f.name.split(".").pop()?.toLowerCase() ?? "",
                type: f.type,
            })),
        [files],
    );

    const humanKB = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

    return (
        <form
            className="w-full"
            onSubmit={(e) => {
                e.preventDefault();
                if (submitDisabled) return;
                onSubmit?.({ title: title.trim(), files });
            }}
        >
            <div className="mx-auto w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-6 pt-0 pb-6 space-y-6">
                {description ? (
                    <header className="pt-2">
                        <p className="text-sm text-gray-600">{description}</p>
                    </header>
                ) : null}

                <fieldset className="rounded-lg border border-gray-200 bg-white px-6 py-5">
                    <legend className="sr-only">문서 버전 기본 정보</legend>
                    <label
                        htmlFor={titleId}
                        className="mb-1 block text-sm font-medium text-gray-800"
                    >
                        {titleLabel}
                    </label>
                    <input
                        id={titleId}
                        type="text"
                        placeholder={titlePlaceholder}
                        aria-label={titleLabel}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                    <p className="mt-2 text-xs text-gray-500">
                        제목 또는 파일 중 하나는 반드시 입력/첨부되어야 합니다.
                    </p>
                </fieldset>

                {hasFiles && (
                    <section className="rounded-lg border border-gray-200 bg-white px-6 py-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-800">업로드된 파일</h3>
                            <p className="text-xs text-gray-500">
                                {files.length}개 파일 · 총 {humanKB(totalSize)}
                            </p>
                        </div>

                        <ul className="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
                            {fileList.map((f) => (
                                <li
                                    key={f.key}
                                    className="flex items-center justify-between px-4 py-2"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <FileIconByMimeType ext={f.ext} mime={f.type} />

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-gray-900">
                                                {f.name}
                                            </p>
                                            <p className="truncate text-xs text-gray-500">
                                                {humanKB(f.size)}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeFile(f.name, Number(f.size))}
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                        disabled={isSubmitting}
                                        aria-label={`${f.name} 제거`}
                                    >
                                        <X size={16} aria-hidden />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className="rounded-lg border border-gray-200 bg-white px-6 py-5 space-y-4">
                    <p id={dropHintId} className="sr-only">
                        PDF, DOC, PPT, 이미지 파일 지원 (최대 10MB). 클릭하거나 드래그앤드롭으로
                        업로드하세요.
                    </p>
                    <FileDropzone accept={accept} hintId={dropHintId} onFiles={handleFiles} />
                </section>

                <FormActions
                    disabled={submitDisabled}
                    submitText={submitText}
                    onTempSave={() => onTempSave?.({ title: title.trim(), files })}
                />
            </div>
        </form>
    );
};
