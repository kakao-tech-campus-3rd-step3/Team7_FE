// pdf 뷰어 버전 비교 위젯
import React from "react";

import { VersionNav, VersionNavItem } from "@/features/document-diff/components/VersionNav";

import { PdfDiffViewer } from "@/core/document-diff/integration/components/DiffViewer/PdfDiffViewer";
import { VersionPickerBar } from "@/core/document-diff/integration/components/VersionPickerBar/VersionPickerBar";
import type { VersionOption } from "@/core/document-diff/integration/components/VersionPickerBar/VersionSelect";

export interface PdfVersionItem extends VersionOption {
    src: unknown;
    createdAt?: string;
}

export interface VersionedPdfDiffWidgetProps {
    versions: PdfVersionItem[];
    defaultLeftId?: string;
    defaultRightId?: string;
    title?: string;
    renderTextLayer?: boolean;
    heightClassName?: string;
}

export const VersionedPdfDiffWidget = ({
    versions,
    defaultLeftId,
    defaultRightId,
    renderTextLayer,
    heightClassName,
}: VersionedPdfDiffWidgetProps) => {
    const sorted = React.useMemo(() => versions.slice(), [versions]);

    const initialLeft = defaultLeftId ?? sorted[0]?.id;
    const initialRight = defaultRightId ?? sorted[1]?.id ?? sorted[0]?.id;

    const [leftId, setLeftId] = React.useState<string | undefined>(initialLeft);
    const [rightId, setRightId] = React.useState<string | undefined>(initialRight);

    const left = React.useMemo(() => versions.find((v) => v.id === leftId), [versions, leftId]);
    const right = React.useMemo(() => versions.find((v) => v.id === rightId), [versions, rightId]);

    const options = React.useMemo(
        () => versions.map(({ id, label }) => ({ id, label })),
        [versions],
    );

    const swap = React.useCallback(() => {
        setLeftId(rightId);
        setRightId(leftId);
    }, [leftId, rightId]);

    if (!left || !right) {
        return (
            <div className="rounded-md border bg-amber-50 p-4 text-sm text-amber-800">
                비교할 버전을 찾을 수 없습니다. 버전 목록을 확인해주세요.
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <VersionNav>
                <VersionNavItem variant="original" label="원본" />
                <VersionNavItem variant="modified" label="수정본" />
            </VersionNav>

            <VersionPickerBar
                options={options}
                leftValue={leftId}
                rightValue={rightId}
                onChangeLeft={setLeftId}
                onChangeRight={setRightId}
                onSwap={swap}
                leftLabel="원본"
                rightLabel="수정본"
            />

            <PdfDiffViewer
                before={left.src}
                after={right.src}
                renderTextLayer={renderTextLayer}
                heightClassName={heightClassName}
            />
        </div>
    );
};
