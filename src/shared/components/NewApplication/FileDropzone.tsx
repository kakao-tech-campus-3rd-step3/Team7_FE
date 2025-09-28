import { useId, useState, useRef } from "react";
import type { SyntheticEvent } from "react";

import { UploadCloud } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface FileDropzoneProps {
    accept?: string;
    onFiles: (files: FileList | null) => void;
    hintId?: string;
    maxSizeMB?: number;
}
type Handler<E> = (event: E) => void;
export const blockEvent =
    <E extends SyntheticEvent>(handler?: Handler<E>) =>
    (event: E) => {
        event.preventDefault();
        event.stopPropagation();
        handler?.(event);
    };

export const FileDropzone = ({ accept, onFiles, hintId, maxSizeMB = 10 }: FileDropzoneProps) => {
    const fileInputId = useId();
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const pickWithAccept = (files: FileList | null) => {
        if (!files) return onFiles(null);

        const patterns = (accept ?? "")
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean);

        const limit = maxSizeMB > 0 ? maxSizeMB * 1024 * 1024 : Infinity;

        const filtered = Array.from(files)
            .filter((f) => {
                if (patterns.length === 0) return true;
                const name = f.name.toLowerCase();
                const type = f.type.toLowerCase();
                return patterns.some((p) => {
                    if (p.startsWith(".")) return name.endsWith(p);
                    if (p.endsWith("/*")) return type.startsWith(p.slice(0, -1));
                    return type === p;
                });
            })
            .filter((f) => f.size <= limit);

        try {
            const dt = new DataTransfer();
            filtered.forEach((f) => dt.items.add(f));
            onFiles(dt.files);
        } catch {
            onFiles(filtered.length === files.length ? files : (filtered as unknown as FileList));
        }
    };

    return (
        <div className="w-full">
            <input
                id={fileInputId}
                ref={inputRef}
                type="file"
                className="sr-only"
                accept={accept}
                multiple
                aria-describedby={hintId}
                aria-label="파일 선택"
                onChange={(e) => {
                    pickWithAccept(e.currentTarget.files);
                    e.currentTarget.value = "";
                }}
            />

            <label
                role="button"
                htmlFor={fileInputId}
                aria-describedby={hintId}
                className={cn(
                    "grid place-items-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition",
                    dragOver
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100",
                )}
                onDragEnter={blockEvent(() => setDragOver(true))}
                onDragOver={blockEvent(() => setDragOver(true))}
                onDragLeave={blockEvent(() => setDragOver(false))}
                onDrop={blockEvent((e) => {
                    setDragOver(false);
                    pickWithAccept(e.dataTransfer.files ?? null);
                })}
                onPaste={(e) => {
                    e.stopPropagation();
                    const files = e.clipboardData?.files ?? null;
                    if (!files || files.length === 0) return;
                    pickWithAccept(files);
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="grid size-12 place-items-center rounded-full bg-white shadow-sm">
                        <UploadCloud className="size-6 text-gray-600" aria-hidden />
                    </div>
                    <p className="text-sm text-gray-800">
                        파일을 드래그 앤 드롭하거나{" "}
                        <span className="font-semibold underline">클릭</span>하여 선택하세요
                    </p>
                    <p id={hintId} className="text-xs text-gray-500">
                        {accept ? `지원 형식: ${accept}` : "PDF, DOC, PPT, 이미지 파일 지원"} · 최대{" "}
                        {maxSizeMB}
                        MB
                    </p>
                </div>
            </label>
        </div>
    );
};
