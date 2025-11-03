import { diffWords, diffSentences, diffChars, type Change } from "diff";

export type DiffGranularity = "sentence" | "word" | "char";

export interface DiffPart {
    value: string;
    added?: boolean;
    removed?: boolean;
}

export interface GetDiffPartsArgs {
    original?: string | null;
    modified?: string | null;
    granularity?: DiffGranularity;
}

function toDiffParts(changes: Change[]): DiffPart[] {
    return changes.map((c) => ({
        value: c.value ?? "",
        added: c.added,
        removed: c.removed,
    }));
}

export function getDiffParts({
    original,
    modified,
    granularity = "word",
}: GetDiffPartsArgs): DiffPart[] {
    const a = original ?? "";
    const b = modified ?? "";

    if (granularity === "sentence") {
        return toDiffParts(diffSentences(a, b, {}));
    }
    if (granularity === "char") {
        return toDiffParts(diffChars(a, b));
    }
    // default: word
    return toDiffParts(diffWords(a, b));
}
