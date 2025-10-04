import { X } from "lucide-react";

import { FileIconByMimeType } from "@/shared/components/NewApplication/FileIconByMimeType";

export interface FileListItemProps {
    name: string;
    size: number;
    ext: string;
    type: string;
    onRemove?: (name: string, size: number) => void;
    disabled?: boolean;
    humanKB: (bytes: number) => string;
}

export const FileListItem = ({
    name,
    size,
    ext,
    type,
    onRemove,
    disabled,
    humanKB,
}: FileListItemProps) => {
    return (
        <li className="flex items-center justify-between px-4 py-2">
            <div className="flex min-w-0 items-center gap-3">
                <FileIconByMimeType ext={ext} mime={type} />
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">{name}</p>
                    <p className="truncate text-xs text-gray-500">{humanKB(size)}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => onRemove?.(name, size)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                disabled={disabled}
                aria-label={`${name} 제거`}
            >
                <X size={16} aria-hidden />
            </button>
        </li>
    );
};
