import { Fragment, useEffect, useMemo, useState } from "react";

import { VersionNav, VersionNavItem } from "@/features/document-diff/components/VersionNav";

import { QnaCard } from "./components/QnaCard";
import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";
import type { DiffGranularity } from "@/core/document-diff/utils/textDiff";

export interface CoverletterQnaItem {
    question: string;
    answer: string;
}

export interface CoverletterVersion {
    id: string;
    label: string;
    items: CoverletterQnaItem[];
}

export interface CoverletterDiffWidgetProps {
    versions?: CoverletterVersion[];
    defaultLeftId?: string;
    defaultRightId?: string;
    originalLabel?: string;
    modifiedLabel?: string;
}

const PanelBody = ({
    originals,
    modifieds,
    mode,
    granularity,
}: {
    originals: CoverletterQnaItem[];
    modifieds: CoverletterQnaItem[];
    mode: "original" | "modified";
    granularity: DiffGranularity;
}) => {
    const max = Math.max(originals.length, modifieds.length);
    return (
        <div className="w-full h-full max-h-[70vh] overflow-auto">
            <ol className="space-y-3 p-4">
                {Array.from({ length: max }).map((_, i) => {
                    const o = originals[i] ?? { question: "", answer: "" };
                    const m = modifieds[i] ?? { question: "", answer: "" };
                    const question = o.question || m.question || `항목 ${i + 1}`;
                    return (
                        <QnaCard
                            key={i}
                            index={i + 1}
                            question={question}
                            originalAnswer={o.answer}
                            modifiedAnswer={m.answer}
                            mode={mode}
                            granularity={granularity}
                        />
                    );
                })}
            </ol>
        </div>
    );
};

export const CoverletterDiffWidget = ({
    versions,
    defaultLeftId,
    defaultRightId,
    originalLabel = "원본",
    modifiedLabel = "수정본",
}: CoverletterDiffWidgetProps) => {
    const [granularity, setGranularity] = useState<DiffGranularity>("word");
    const isSentence = granularity === "sentence";
    const isWord = granularity === "word";

    const hasVersions = Array.isArray(versions) && versions.length > 0;
    const [leftId, setLeftId] = useState<string | undefined>(
        defaultLeftId ?? (hasVersions ? versions![0].id : undefined),
    );
    const [rightId, setRightId] = useState<string | undefined>(
        defaultRightId ?? (hasVersions ? (versions![1]?.id ?? versions![0].id) : undefined),
    );

    useEffect(() => {
        if (!hasVersions) return;
        const ids = new Set(versions!.map((v) => v.id));
        const safeLeft = leftId && ids.has(leftId) ? leftId : versions![0].id;
        const safeRight =
            rightId && ids.has(rightId) ? rightId : (versions![1]?.id ?? versions![0].id);
        if (safeLeft !== leftId) setLeftId(safeLeft);
        if (safeRight !== rightId) setRightId(safeRight);
    }, [hasVersions, versions, leftId, rightId]);

    useEffect(() => {
        if (!hasVersions || !leftId || !rightId) return;
        if (leftId === rightId && versions!.length > 1) {
            const i = versions!.findIndex((v) => v.id === leftId);
            const next = versions![(i + 1) % versions!.length].id;
            setRightId(next);
        }
    }, [hasVersions, versions, leftId, rightId]);

    const selectedLeftItems = useMemo<CoverletterQnaItem[] | undefined>(() => {
        if (!hasVersions) return undefined;
        const v = versions!.find((v) => v.id === leftId) ?? versions![0];
        return v.items;
    }, [hasVersions, versions, leftId]);

    const selectedRightItems = useMemo<CoverletterQnaItem[] | undefined>(() => {
        if (!hasVersions) return undefined;
        const v = versions!.find((v) => v.id === rightId) ?? versions![0];
        return v.items;
    }, [hasVersions, versions, rightId]);

    const leftItems = selectedLeftItems ?? [];
    const rightItems = selectedRightItems ?? [];

    const btn = useMemo(
        () =>
            "h-8 px-3 text-xs rounded-md border transition-colors " +
            "data-[active=true]:bg-slate-900 data-[active=true]:text-white",
        [],
    );

    const onKeyDownRadio = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            setGranularity("sentence");
            e.preventDefault();
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            setGranularity("word");
            e.preventDefault();
        }
    };

    return (
        <Fragment>
            <VersionNav>
                <VersionNavItem variant="original" label={originalLabel} />
                <VersionNavItem variant="modified" label={modifiedLabel} />
            </VersionNav>

            <div className="mt-3 mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div
                    className="flex justify-center gap-2"
                    role="radiogroup"
                    aria-label="비교 단위 선택"
                >
                    <button
                        type="button"
                        role="radio"
                        aria-checked={isSentence}
                        tabIndex={isSentence ? 0 : -1}
                        onKeyDown={onKeyDownRadio}
                        className={btn}
                        data-active={isSentence}
                        onClick={() => setGranularity("sentence")}
                    >
                        문장 단위
                    </button>
                    <button
                        type="button"
                        role="radio"
                        aria-checked={isWord}
                        tabIndex={isWord ? 0 : -1}
                        onKeyDown={onKeyDownRadio}
                        className={btn}
                        data-active={isWord}
                        onClick={() => setGranularity("word")}
                    >
                        단어 단위
                    </button>
                </div>

                {hasVersions && (
                    <div className="flex items-center justify-center gap-2">
                        <label className="inline-flex items-center gap-2">
                            <span className="text-xs text-neutral-600">{originalLabel}</span>
                            <select
                                className="h-8 rounded-md border bg-white px-2 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                                value={leftId}
                                onChange={(e) => setLeftId(e.target.value)}
                                aria-label="원본 버전 선택"
                            >
                                {versions!.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                const l = leftId;
                                setLeftId(rightId);
                                setRightId(l);
                            }}
                            className=" px-1 text-sm"
                            aria-label="좌우 버전 스왑"
                            title="좌우 버전 바꾸기"
                        >
                            ↔︎
                        </button>
                        <label className="inline-flex items-center gap-2">
                            <span className="text-xs text-neutral-600">{modifiedLabel}</span>
                            <select
                                className="h-8 rounded-md border bg-white px-2 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                                value={rightId}
                                onChange={(e) => setRightId(e.target.value)}
                                aria-label="수정본 버전 선택"
                            >
                                {versions!.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}
            </div>

            <DiffLayout
                className="w-full h-full mt-1"
                gapXClass="gap-x-6"
                showDivider
                center={false}
                leftAccentClass="border-l-4 border-rose-500"
                rightAccentClass="border-l-4 border-emerald-500"
                panelClassName="rounded-lg border"
                leftClassName="bg-rose-50/60"
                rightClassName="bg-emerald-50/60"
                panelWrapper={({ className, children }) => (
                    <article className={className}>{children}</article>
                )}
            >
                <PanelBody
                    originals={leftItems}
                    modifieds={rightItems}
                    mode="original"
                    granularity={granularity}
                />
                <PanelBody
                    originals={leftItems}
                    modifieds={rightItems}
                    mode="modified"
                    granularity={granularity}
                />
            </DiffLayout>
        </Fragment>
    );
};
