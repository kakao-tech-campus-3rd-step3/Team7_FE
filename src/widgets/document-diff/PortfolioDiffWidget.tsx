//포트폴리오
import { VersionedPdfDiffWidget, type VersionedDiffWidgetProps } from "./VersionedDiffWidget";

export interface PortfolioDiffWidgetProps
    extends Omit<VersionedDiffWidgetProps, "titleLeft" | "titleRight"> {}

export const PortfolioDiffWidget = (props: PortfolioDiffWidgetProps) => {
    return <VersionedPdfDiffWidget titleLeft="원본" titleRight="수정본" {...props} />;
};
