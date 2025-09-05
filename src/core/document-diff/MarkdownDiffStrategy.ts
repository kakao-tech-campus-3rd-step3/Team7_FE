import type { FileType } from "@/core/@types/FileType";
import type { DiffResult } from "@/core/document-diff/base/DiffResult";
import { DiffStrategy } from "@/core/document-diff/base/DiffStrategy";

export interface MarkdownDiffResult extends DiffResult<string> {
    renderer: typeof FileType.MARKDOWN;
}

export class MarkdownDiffStrategy extends DiffStrategy<MarkdownDiffResult> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override async process(_before: string, _after: string): Promise<MarkdownDiffResult> {
        throw new Error("Method not implemented.");
    }
}
