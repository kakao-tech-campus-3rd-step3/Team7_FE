import type { DiffPart } from "@/core/document-diff/utils/textDiff";

export interface OriginalDiffTokenProps {
    part: DiffPart;
}
export const OriginalDiffToken = ({ part }: OriginalDiffTokenProps) => {
    if (part.removed) {
        return (
            <del className="bg-rose-200/60 text-rose-800 underline decoration-rose-500/60">
                {part.value}
            </del>
        );
    }
    if (part.added) return null;
    return <span>{part.value}</span>;
};
export interface ModifiedDiffTokenProps {
    part: DiffPart;
}
export const ModifiedDiffToken = ({ part }: ModifiedDiffTokenProps) => {
    if (part.added) {
        return (
            <ins
                className="bg-emerald-200/60 text-emerald-900 no-underline"
                style={{ textDecoration: "none" }}
            >
                {part.value}
            </ins>
        );
    }
    if (part.removed) return null;
    return <span>{part.value}</span>;
};
