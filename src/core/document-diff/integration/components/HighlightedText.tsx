import type { DiffPart } from "@/core/document-diff/utils/textDiff";

export interface HighlightedTextProps {
    parts: DiffPart[];
    mode: "original" | "modified";
    className?: string;
}

export const HighlightedText = ({ parts, mode, className }: HighlightedTextProps) => {
    return (
        <span className={className}>
            {parts.map((p, idx) => {
                if (mode === "original") {
                    if (p.removed) {
                        return (
                            <del
                                key={idx}
                                className="bg-rose-200/60 text-rose-800 underline decoration-rose-500/60"
                            >
                                {p.value}
                            </del>
                        );
                    }
                    if (p.added) {
                        return null;
                    }
                } else {
                    // modified
                    if (p.added) {
                        return (
                            <ins
                                key={idx}
                                className="bg-emerald-200/60 text-emerald-900 no-underline"
                                style={{ textDecoration: "none" }}
                            >
                                {p.value}
                            </ins>
                        );
                    }
                    if (p.removed) {
                        return null;
                    }
                }
                return <span key={idx}>{p.value}</span>;
            })}
        </span>
    );
};
