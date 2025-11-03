// 버전 비교 PDF 문서 차이 위젯
import {
    VersionedPdfDiffWidget as BaseVersionedPdfDiffWidget,
    type VersionedPdfDiffWidgetProps as NewProps,
    type PdfVersionItem,
} from "./VersionedPdfDiffWidget";

export interface VersionedDiffWidgetProps extends Partial<NewProps> {
    titleLeft?: string;
    titleRight?: string;

    beforeSrc?: unknown;
    afterSrc?: unknown;

    renderTextLayer?: boolean;
    heightClassName?: string;
}

export const VersionedPdfDiffWidget = ({
    title,
    titleLeft,
    titleRight,
    versions,
    defaultLeftId,
    defaultRightId,
    beforeSrc,
    afterSrc,
}: VersionedDiffWidgetProps) => {
    let effectiveVersions: PdfVersionItem[] | undefined = versions as PdfVersionItem[] | undefined;
    if ((!versions || versions.length === 0) && beforeSrc && afterSrc) {
        effectiveVersions = [
            { id: "before", label: titleLeft ?? "원본", src: beforeSrc },
            { id: "after", label: titleRight ?? "수정본", src: afterSrc },
        ];
    }

    const effectiveTitle =
        title ?? (titleLeft && titleRight ? `${titleLeft} ↔ ${titleRight}` : undefined);

    return (
        <BaseVersionedPdfDiffWidget
            versions={effectiveVersions ?? []}
            defaultLeftId={defaultLeftId}
            defaultRightId={defaultRightId}
            title={effectiveTitle}
        />
    );
};
export { VersionedPdfDiffWidget as VersionedDiffWidget };
