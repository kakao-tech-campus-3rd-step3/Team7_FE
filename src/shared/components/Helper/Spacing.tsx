import type { CSSProperties } from "react";

export interface SpacingProps {
    height: CSSProperties["height"];
    backgroundColor?: CSSProperties["backgroundColor"];
}

export const Spacing = ({ height, backgroundColor }: SpacingProps) => {
    return <div style={{ height, backgroundColor }} />;
};
