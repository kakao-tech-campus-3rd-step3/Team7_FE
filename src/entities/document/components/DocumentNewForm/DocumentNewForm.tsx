import { useCallback, useId, useMemo } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { NewDocumentSchema } from "@/entities/document/models/newDocument";

import { FileDropzone } from "@/shared/components/NewApplication/FileDropzone";
import { FormActions } from "@/shared/components/NewApplication/FormActions";

import { FileListItem } from "./FileListItem";
import { zodResolver } from "@hookform/resolvers/zod";

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

type FormIn = z.input<typeof NewDocumentSchema>;
type FormOut = z.output<typeof NewDocumentSchema>;

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
    const titleId = useId();
    const dropHintId = useId();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        formState: { errors, isSubmitting: isFormSubmitting },
    } = useForm<FormIn, unknown, FormOut>({
        resolver: zodResolver(NewDocumentSchema),
        defaultValues: {
            title: initialTitle ?? "",
            files: initialFiles ?? [],
        },
        mode: "onBlur",
    });

    const title = watch("title") ?? "";
    const files = watch("files") ?? [];

    const hasTitle = title.trim().length > 0;
    const hasFiles = files.length > 0;
    const submitDisabled = isSubmitting || isFormSubmitting || (!hasTitle && !hasFiles);

    const handleFiles = useCallback(
        (pickedList: FileList | File[] | null) => {
            if (isSubmitting || isFormSubmitting) return;

            const picked = pickedList
                ? Array.isArray(pickedList)
                    ? pickedList
                    : Array.from(pickedList)
                : [];

            if (picked.length === 0) return;

            setValue("files", multiple ? [...files, ...picked] : [picked[0]], {
                shouldValidate: true,
            });
        },
        [files, isSubmitting, isFormSubmitting, multiple, setValue],
    );

    const removeFile = useCallback(
        (name: string, size: number) => {
            const next = files.filter((f) => !(f.name === name && f.size === size));
            setValue("files", next, { shouldValidate: true });
        },
        [files, setValue],
    );

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

    const onValid = (values: FormOut) => {
        if (submitDisabled) return;
        onSubmit?.({ title: values.title.trim(), files: values.files });
    };

    return (
        <form className="w-full" onSubmit={handleSubmit(onValid)}>
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
                        {...register("title")}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                    <p className="mt-2 text-xs text-gray-500">
                        제목 또는 파일 중 하나는 반드시 입력/첨부되어야 합니다.
                    </p>
                    {errors.title?.message ? (
                        <p role="alert" className="mt-1 text-xs text-red-600">
                            {errors.title.message}
                        </p>
                    ) : null}
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
                                <FileListItem
                                    key={f.key}
                                    name={f.name}
                                    size={f.size}
                                    ext={f.ext}
                                    type={f.type}
                                    disabled={isSubmitting || isFormSubmitting}
                                    onRemove={removeFile}
                                    humanKB={humanKB}
                                />
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
                    onTempSave={() => {
                        const result = NewDocumentSchema.safeParse(getValues());
                        if (!result.success) {
                            return;
                        }
                        onTempSave?.({ title: result.data.title.trim(), files: result.data.files });
                    }}
                />
            </div>
        </form>
    );
};
