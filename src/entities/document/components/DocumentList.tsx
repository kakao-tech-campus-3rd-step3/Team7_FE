import type { ComponentPropsWithoutRef } from "react";

import { Eye, Trash, Folder, FileText } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

export interface DocumentVersion {
    id: string;
    title: string;
    description: string;
    date: string;
}

export interface DocumentListProps extends ComponentPropsWithoutRef<"div"> {
    title: string;
    versions: DocumentVersion[];
    onCreateVersion?: () => void;
    onViewVersion?: (id: string) => void;
    onDeleteVersion?: (id: string) => void;
}

export const DocumentList = ({
    title,
    versions,
    onCreateVersion,
    onViewVersion,
    onDeleteVersion,
    className,
    ...rest
}: DocumentListProps) => (
    <Card className={cn("border border-gray-200", className)} {...rest}>
        <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="grid size-6 place-items-center rounded-md border border-indigo-100 bg-indigo-50 text-indigo-500">
                        <Folder size={14} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>

                <Button
                    type="button"
                    onClick={onCreateVersion}
                    className="text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                >
                    + 새 버전 만들기
                </Button>
            </div>

            {versions.length === 0 ? (
                <div
                    className="grid place-items-center rounded-lg border border-dashed border-gray-200 bg-white py-10 text-center"
                    role="status"
                    aria-live="polite"
                >
                    <p className="mb-2 text-sm text-gray-600">아직 생성된 버전이 없습니다.</p>
                    <Button
                        type="button"
                        onClick={onCreateVersion}
                        className="text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        새 버전 만들기
                    </Button>
                </div>
            ) : (
                <ul className="space-y-2" role="list">
                    {versions.map((v) => (
                        <li
                            key={v.id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2"
                            role="listitem"
                        >
                            <div className="flex items-center gap-3">
                                <div className="grid size-9 place-items-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-500">
                                    <FileText size={16} />
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-gray-900">
                                        {v.title}
                                    </p>
                                    <p className="text-sm font-normal text-gray-600">
                                        {v.description}
                                    </p>
                                    <p className="text-xs font-normal text-gray-400">{v.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    aria-label="보기"
                                    title="보기"
                                    onClick={() => onViewVersion?.(v.id)}
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
                                    onClick={() => onDeleteVersion?.(v.id)}
                                    disabled={!onDeleteVersion}
                                >
                                    <Trash size={16} />
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </CardContent>
    </Card>
);
