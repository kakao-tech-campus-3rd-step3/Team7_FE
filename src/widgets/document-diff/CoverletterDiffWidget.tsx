import { Fragment, useMemo, useState } from "react";

import { VersionNav, VersionNavItem } from "@/features/document-diff/components/VersionNav";

import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";
import { HighlightedText } from "@/core/document-diff/integration/components/HighlightedText";
import { getDiffParts, type DiffGranularity } from "@/core/document-diff/utils/textDiff";

export interface CoverletterQnaItem {
    question: string;
    answer: string;
}

export interface CoverletterDiffWidgetProps {
    originalItems?: CoverletterQnaItem[];
    modifiedItems?: CoverletterQnaItem[];
    originalLabel?: string;
    modifiedLabel?: string;
}

const QnaCard = ({
    index,
    question,
    answerParts,
    mode,
}: {
    index: number;
    question: string;
    answerParts: ReturnType<typeof getDiffParts>;
    mode: "original" | "modified";
}) => (
    <li className="rounded-md border bg-white p-3">
        <h4 className="text-[13px] font-semibold leading-6">
            {index}. {question}
        </h4>
        <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700">
            <HighlightedText parts={answerParts} mode={mode} />
        </p>
    </li>
);

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
                    const parts = getDiffParts({
                        original: o.answer,
                        modified: m.answer,
                        granularity,
                    });
                    const question = o.question || m.question || `항목 ${i + 1}`;
                    return (
                        <QnaCard
                            key={i}
                            index={i + 1}
                            question={question}
                            answerParts={parts}
                            mode={mode}
                        />
                    );
                })}
            </ol>
        </div>
    );
};

export const CoverletterDiffWidget = ({
    originalItems = [
        {
            question: "지원동기 및 입사 후 포부",
            answer:
                "제가 Career-Fit에 지원한 이유는 사용자 문제를 데이터로 확인하고 개선하는 일이 즐겁기 때문입니다. " +
                "최근 교내 프로젝트에서 인터뷰와 로그 분석을 통해 전환 저하 원인을 찾고, 온보딩 문구를 다듬어 전환율을 12% 개선했습니다. " +
                "입사 후에는 실험-학습 루프를 정착시키고, 작은 배포를 자주 하는 문화를 만들고 싶습니다.",
        },
        {
            question: "직무 관련 역량",
            answer:
                "React와 TypeScript 기반으로 대시보드와 Form을 구현했고, 상태 관리는 Zustand를 사용했습니다. " +
                "접근성 점검을 통해 키보드 내비게이션과 명도 대비를 개선했습니다.",
        },
    ],
    modifiedItems = [
        {
            question: "지원동기 및 입사 후 포부",
            answer:
                "제가 Career-Fit에 지원한 이유는 사용자 문제를 데이터로 확인하고 개선하는 일이 즐겁기 때문입니다. " +
                "최근 교내 프로젝트에서 인터뷰와 로그 분석으로 전환 저하 원인을 규명하고, 온보딩 문구와 흐름을 다듬어 전환율을 15% 개선했습니다. " +
                "특히 실험 결과를 팀과 공유해 재현 가능한 개선 프로세스를 만들었습니다.",
        },
        {
            question: "직무 관련 역량",
            answer:
                "React와 TypeScript 기반으로 대시보드와 Form을 구현했고, 상태 관리는 Zustand와 React Query를 병행했습니다. " +
                "접근성 점검을 통해 키보드 내비게이션과 명도 대비를 개선했고, Vitest 기반 단위 테스트로 회귀를 방지했습니다.",
        },
        {
            question: "프로젝트 성과(신규)",
            answer:
                "로그 기반 퍼널을 정의하고 병목 단계에서의 이탈 원인을 표준화된 체크리스트로 관리했습니다. " +
                "그 결과 릴리스 후 첫 2주간 활성 사용자 잔존율이 8%p 상승했습니다.",
        },
    ],
    originalLabel = "원본",
    modifiedLabel = "수정본",
}: CoverletterDiffWidgetProps) => {
    const [granularity, setGranularity] = useState<DiffGranularity>("word");
    const isSentence = granularity === "sentence";
    const isWord = granularity === "word";

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

            <div
                className="flex justify-center gap-2 mt-3 mb-2"
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
                    originals={originalItems}
                    modifieds={modifiedItems}
                    mode="original"
                    granularity={granularity}
                />
                <PanelBody
                    originals={originalItems}
                    modifieds={modifiedItems}
                    mode="modified"
                    granularity={granularity}
                />
            </DiffLayout>
        </Fragment>
    );
};
