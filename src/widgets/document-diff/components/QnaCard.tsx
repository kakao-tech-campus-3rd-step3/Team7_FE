import { HighlightedText } from "@/core/document-diff/integration/components/HighlightedText";
import { getDiffParts, type DiffGranularity } from "@/core/document-diff/utils/textDiff";

export interface QnaCardProps {
    index: number;
    question: string;
    originalAnswer: string;
    modifiedAnswer: string;
    mode: "original" | "modified";
    granularity: DiffGranularity;
}

export const QnaCard = ({
    index,
    question,
    originalAnswer,
    modifiedAnswer,
    mode,
    granularity,
}: QnaCardProps) => {
    const parts = getDiffParts({
        original: originalAnswer,
        modified: modifiedAnswer,
        granularity,
    });

    return (
        <li className="rounded-md border bg-white p-3">
            <h4 className="text-[13px] font-semibold leading-6">
                {index}. {question}
            </h4>
            <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700">
                <HighlightedText parts={parts} mode={mode} />
            </p>
        </li>
    );
};
