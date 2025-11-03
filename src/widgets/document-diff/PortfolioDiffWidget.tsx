import { VersionedPdfDiffWidget, type VersionedDiffWidgetProps } from "./VersionedDiffWidget";

export interface CoverletterDiffWidgetProps
    extends Omit<VersionedDiffWidgetProps, "titleLeft" | "titleRight"> {}

export const PortfolioDiffWidget = (props: CoverletterDiffWidgetProps) => {
    return <VersionedPdfDiffWidget titleLeft="원본" titleRight="수정본" {...props} />;
};
