import { useId, useState } from "react";

import { UploadCloud } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface FileDropzoneProps {
    accept?: string;
    onFiles: (files: FileList | null) => void;
    hintId?: string;
}

export const FileDropzone = ({ accept, onFiles, hintId }: FileDropzoneProps) => {
    const fileInputId = useId();
    const [dragOver, setDragOver] = useState(false);

    return (
        <div
            aria-describedby={hintId}
            onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                onFiles(e.dataTransfer.files);
            }}
            className={cn(
                "w-full rounded-lg border border-dashed px-4 text-center",
                "min-h-44 md:min-h-56 flex items-center justify-center",
                dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white",
            )}
        >
            <input
                id={fileInputId}
                type="file"
                accept={accept}
                multiple
                className="sr-only"
                aria-label="문서 파일 선택"
                onChange={(e) => onFiles(e.currentTarget.files)}
            />

            <div className="flex flex-col items-center">
                <div className="mb-3 grid size-10 place-items-center rounded-full bg-gray-100 text-gray-400">
                    <UploadCloud size={20} />
                </div>

                <p className="text-sm font-semibold text-gray-700">
                    파일을 드래그하거나 클릭하여 업로드
                </p>
                <p className="mt-1 text-xs text-gray-400">
                    PDF, DOC, PPT, 이미지 파일 지원 (최대 10MB)
                </p>

                <label
                    htmlFor={fileInputId}
                    className="mt-3 inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1E40AF]"
                >
                    파일 선택
                </label>
            </div>
        </div>
    );
};
