import { diffWordsWithSpace, diffSentences } from "diff";

export interface DiffPart {
    value: string;
    added?: boolean;
    removed?: boolean;
}

export type DiffGranularity = "word" | "sentence";

export interface GetDiffPartsArgs {
    original: string;
    modified: string;
    granularity?: DiffGranularity;
}

export function getDiffParts({
    original,
    modified,
    granularity = "word",
}: GetDiffPartsArgs): DiffPart[] {
    if (granularity === "sentence") {
        return diffSentences(original ?? "", modified ?? "", {}) as DiffPart[];
    }
    return diffWordsWithSpace(original ?? "", modified ?? "", {}) as DiffPart[];
}
