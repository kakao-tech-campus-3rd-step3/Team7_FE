import type { PropsWithChildren } from "react";

import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";

export interface MarkdownDiffViewerProps {
    before: string;
    after: string;
}

const Panel = ({ children }: PropsWithChildren) => (
    <div className="w-full h-full max-h-[70vh] overflow-auto">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed p-4">
            {children}
        </pre>
    </div>
);

export const MarkdownDiffViewer = ({ before, after }: MarkdownDiffViewerProps) => {
    return (
        <DiffLayout
            className="w-full h-full"
            gapXClass="gap-x-6"
            showDivider
            center={false}
            leftAccentClass="border-l-4 border-blue-500"
            rightAccentClass="border-l-4 border-emerald-500"
            panelClassName="rounded-lg border bg-white"
        >
            <Panel>{before}</Panel>
            <Panel>{after}</Panel>
        </DiffLayout>
    );
};
