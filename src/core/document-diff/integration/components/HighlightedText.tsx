import { ModifiedDiffToken, OriginalDiffToken } from "./DiffToken";
import type { DiffPart } from "@/core/document-diff/utils/textDiff";

export interface HighlightedTextProps {
    parts: DiffPart[];
    mode: "original" | "modified";
    className?: string;
}

export const HighlightedText = ({ parts, mode, className }: HighlightedTextProps) => {
    const Token = mode === "original" ? OriginalDiffToken : ModifiedDiffToken;
    return (
        <span className={className}>
            {parts.map((p, idx) => (
                <Token key={idx} part={p} />
            ))}
        </span>
    );
};
