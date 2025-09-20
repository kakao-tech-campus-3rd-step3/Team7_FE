import type { ComponentPropsWithoutRef } from "react";

import { Folder } from "lucide-react";

import {
    DocumentListItem,
    type DocumentListItemProps,
} from "@/entities/document/components/DocumentList";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

export interface DocumentListProps extends ComponentPropsWithoutRef<"div"> {
    title: string;
    versions: DocumentListItemProps[];
    onCreateVersion?: () => void;
    onViewVersion?: (id: string) => void;
    onDeleteVersion?: (id: string) => void;
    hideCreateButton?: boolean;
}

export const DocumentList = ({
    title,
    versions,
    onCreateVersion,
    onViewVersion,
    onDeleteVersion,
    className,
    hideCreateButton,
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

                {!hideCreateButton && (
                    <Button
                        type="button"
                        onClick={onCreateVersion}
                        className="text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        + 새 버전 만들기
                    </Button>
                )}
            </div>

            {versions.length === 0 ? (
                <div
                    className="grid place-items-center rounded-lg border border-dashed border-gray-200 bg-white py-10 text-center"
                    role="status"
                    aria-live="polite"
                >
                    <p className="mb-2 text-sm text-gray-600">아직 생성된 버전이 없습니다.</p>
                    {!hideCreateButton && (
                        <Button
                            type="button"
                            onClick={onCreateVersion}
                            className="text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            새 버전 만들기
                        </Button>
                    )}
                </div>
            ) : (
                <ul className="space-y-2" role="list">
                    {versions.map((version) => (
                        <DocumentListItem
                            key={version.id}
                            id={version.id}
                            title={version.title}
                            description={version.description}
                            date={version.date}
                            onViewVersion={onViewVersion}
                            onDeleteVersion={onDeleteVersion}
                        />
                    ))}
                </ul>
            )}
        </CardContent>
    </Card>
);
