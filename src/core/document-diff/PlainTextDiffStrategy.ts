import type { FileType } from "@/core/@types/FileType";
import type { DiffResult } from "@/core/document-diff/base/DiffResult";
import { DiffStrategy } from "@/core/document-diff/base/DiffStrategy";

export interface PlainTextDiffResult extends DiffResult<string> {
    renderer: typeof FileType.TEXT;
}

export class PlainTextDiffStrategy extends DiffStrategy<PlainTextDiffResult> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override async process(_before: string, _after: string): Promise<PlainTextDiffResult> {
        throw new Error("Method not implemented.");
    }
}
