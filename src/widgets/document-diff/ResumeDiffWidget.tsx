//이력서
import { VersionedPdfDiffWidget, type VersionedDiffWidgetProps } from "./VersionedDiffWidget";

export interface ResumeDiffWidgetProps
    extends Omit<VersionedDiffWidgetProps, "titleLeft" | "titleRight"> {}

export const ResumeDiffWidget = (props: ResumeDiffWidgetProps) => {
    return <VersionedPdfDiffWidget titleLeft="원본" titleRight="수정본" {...props} />;
};
