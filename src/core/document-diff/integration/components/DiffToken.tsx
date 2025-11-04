import type { DiffPart } from "@/core/document-diff/utils/textDiff";

export interface DiffTokenProps {
    part: DiffPart;
    index?: number;
}

export const OriginalDiffToken = ({ part, index }: DiffTokenProps) => {
    if (part.removed) {
        return (
            <del
                key={index}
                className="bg-rose-200/60 text-rose-800 underline decoration-rose-500/60"
            >
                {part.value}
            </del>
        );
    }
    if (part.added) return null;
    return <span key={index}>{part.value}</span>;
};

export const ModifiedDiffToken = ({ part, index }: DiffTokenProps) => {
    if (part.added) {
        return (
            <ins
                key={index}
                className="bg-emerald-200/60 text-emerald-900 no-underline"
                style={{ textDecoration: "none" }}
            >
                {part.value}
            </ins>
        );
    }
    if (part.removed) return null;
    return <span key={index}>{part.value}</span>;
};
