import { FileText, Eye, Trash } from "lucide-react";

import { Button } from "@/shared/ui/button";

export interface DocumentListItemProps {
    id: string;
    title: string;
    description: string;
    date: string;

    onViewVersion?: (id: string) => void;
    onDeleteVersion?: (id: string) => void;
}

export const DocumentListItem = ({
    id,
    title,
    description,
    date,
    onViewVersion,
    onDeleteVersion,
}: DocumentListItemProps) => {
    return (
        <li
            key={id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2"
            role="listitem"
        >
            <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-500">
                    <FileText size={16} />
                </div>
                <div>
                    <p className="text-base font-semibold text-gray-900">{title}</p>
                    <p className="text-sm font-normal text-gray-600">{description}</p>
                    <p className="text-xs font-normal text-gray-400">{date}</p>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label="보기"
                    title="보기"
                    onClick={() => onViewVersion?.(id)}
                    disabled={!onViewVersion}
                >
                    <Eye size={16} />
                </Button>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label="삭제"
                    title="삭제"
                    onClick={() => onDeleteVersion?.(id)}
                    disabled={!onDeleteVersion}
                >
                    <Trash size={16} />
                </Button>
            </div>
        </li>
    );
};
