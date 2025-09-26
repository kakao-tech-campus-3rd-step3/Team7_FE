import { useId, useState, useRef } from "react";

import { UploadCloud } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface FileDropzoneProps {
    accept?: string;
    onFiles: (files: FileList | null) => void;
    hintId?: string;
    maxSizeMB?: number;
}

export const FileDropzone = ({ accept, onFiles, hintId, maxSizeMB = 10 }: FileDropzoneProps) => {
    const fileInputId = useId();
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const pickWithAccept = (files: FileList | null) => {
        if (!files) return onFiles(null);

        const patterns = (accept ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

        let filtered = Array.from(files);

        if (patterns.length > 0) {
            filtered = filtered.filter((f) =>
                patterns.some((p) => {
                    if (p.startsWith(".")) return f.name.toLowerCase().endsWith(p.toLowerCase());
                    if (p.endsWith("/*")) return f.type.startsWith(p.slice(0, -1));
                    return f.type === p;
                }),
            );
        }

        if (maxSizeMB > 0) {
            const limit = maxSizeMB * 1024 * 1024;
            filtered = filtered.filter((f) => f.size <= limit);
        }

        let next: FileList;
        try {
            const dt = new DataTransfer();
            filtered.forEach((f) => dt.items.add(f));
            next = dt.files;
        } catch {
            next =
                filtered.length === (files as FileList).length
                    ? (files as FileList)
                    : (filtered as unknown as FileList);
        }
        onFiles(next);
    };

    return (
        <div className="w-full">
            <label
                htmlFor={fileInputId}
                aria-describedby={hintId}
                aria-label="파일 업로드 영역"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        inputRef.current?.click();
                    }
                }}
                onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOver(true);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOver(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOver(false);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOver(false);
                    pickWithAccept(e.dataTransfer.files ?? null);
                }}
                onPaste={(e) => {
                    e.stopPropagation();
                    const files = Array.from(e.clipboardData?.files ?? []);
                    if (files.length === 0) return;
                    const dt = new DataTransfer();
                    files.forEach((f) => dt.items.add(f));
                    pickWithAccept(dt.files);
                }}
                className={cn(
                    "block w-full rounded-lg border border-dashed px-4 text-center",
                    "min-h-44 md:min-h-56 cursor-pointer",
                    "flex items-center justify-center",
                    dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white",
                )}
            >
                <div className="flex flex-col items-center">
                    <div
                        className="mb-3 grid size-10 place-items-center rounded-full bg-gray-100 text-gray-400"
                        aria-hidden
                    >
                        <UploadCloud size={20} />
                    </div>

                    <p className="text-sm font-semibold text-gray-700">
                        파일을 드래그하거나 클릭하여 업로드
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        PDF, DOC, PPT, 이미지 파일 지원 (최대 {maxSizeMB}MB)
                    </p>

                    <span className="mt-3 inline-flex select-none items-center justify-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1E40AF]">
                        파일 선택
                    </span>
                </div>
            </label>

            <input
                id={fileInputId}
                ref={inputRef}
                type="file"
                accept={accept}
                multiple
                className="sr-only"
                aria-label="문서 파일 선택"
                onChange={(e) => {
                    pickWithAccept(e.currentTarget.files);
                    e.currentTarget.value = "";
                }}
            />
        </div>
    );
};
