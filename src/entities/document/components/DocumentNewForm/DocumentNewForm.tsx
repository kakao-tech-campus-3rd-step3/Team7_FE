import { useId, useState } from "react";

import { DocumentList } from "@/entities/document/components/DocumentList";

import { FileDropzone } from "@/shared/components/NewApplication/FileDropzone";
import { FormActions } from "@/shared/components/NewApplication/FormActions";

export interface DocumentNewFormProps {
    titleLabel: string;
    titlePlaceholder?: string;
    accept?: string;
    submitText?: string;
    onSubmit?: (payload: { title: string; files: File[] }) => void;
}

const humanFileSize = (bytes: number) => {
    if (!bytes) return "0 B";
    const k = 1024,
        units = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(i ? 1 : 0)} ${units[i]}`;
};

const formatNow = () =>
    new Date().toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

export const DocumentNewForm = ({
    titleLabel,
    titlePlaceholder = "예: 2차 피드백 반영, 최종 양식본 등",
    accept = ".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg",
    submitText = "새 버전 저장",
    onSubmit,
}: DocumentNewFormProps) => {
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const titleInputId = useId();
    const dropHintId = useId();
    const disabled = !title.trim() || files.length === 0;

    const addFiles = (list: FileList | null) => {
        if (!list) return;
        const incoming = Array.from(list);
        setFiles((prev) => {
            const merged = [...prev];
            incoming.forEach((nf) => {
                const dup = merged.some(
                    (f) =>
                        f.name === nf.name &&
                        f.size === nf.size &&
                        f.lastModified === nf.lastModified,
                );
                if (!dup) merged.push(nf);
            });
            return merged;
        });
    };

    const versions = files.map((f, idx) => ({
        id: `${idx}-${f.name}`,
        title: f.name,
        description: humanFileSize(f.size),
        date: formatNow(),
    }));

    return (
        <form
            className="w-full"
            onSubmit={(e) => {
                e.preventDefault();
                if (!title.trim()) {
                    alert("제목을 입력하세요.");
                    return;
                }
                if (files.length === 0) {
                    alert("업로드할 파일을 추가하세요.");
                    return;
                }
                if (disabled) return;
                onSubmit?.({ title: title.trim(), files });
            }}
            aria-labelledby={titleInputId}
        >
            <section
                className={[
                    "mx-auto w-full",
                    "sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl",
                    "rounded-lg border border-dashed border-gray-300 bg-gray-50",
                    "px-6 py-6",
                ].join(" ")}
            >
                <div className="mb-5">
                    <label
                        htmlFor={titleInputId}
                        className="mb-1 block text-sm font-medium text-gray-800"
                    >
                        {titleLabel}
                        <span aria-hidden className="ml-1 align-middle text-red-500">
                            *
                        </span>
                        <span className="sr-only"> (필수)</span>
                    </label>
                    <input
                        id={titleInputId}
                        type="text"
                        value={title}
                        placeholder={titlePlaceholder}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                {files.length > 0 && (
                    <div className="mb-4">
                        <DocumentList
                            title="업로드된 파일"
                            versions={versions}
                            hideCreateButton
                            onDeleteVersion={(id) => {
                                const idx = versions.findIndex((v) => v.id === id);
                                if (idx >= 0) setFiles((prev) => prev.filter((_, i) => i !== idx));
                            }}
                            onViewVersion={() => {}}
                            className="bg-transparent border-0 p-0"
                        />
                    </div>
                )}

                <div className="mb-2">
                    <p id={dropHintId} className="mb-2 text-sm font-medium text-gray-800">
                        파일 업로드
                    </p>
                    <FileDropzone accept={accept} onFiles={addFiles} hintId={dropHintId} />
                </div>

                <FormActions
                    disabled={disabled}
                    submitText={submitText}
                    onTempSave={() => {
                        alert("임시 저장되었습니다.");
                    }}
                />
            </section>
        </form>
    );
};
