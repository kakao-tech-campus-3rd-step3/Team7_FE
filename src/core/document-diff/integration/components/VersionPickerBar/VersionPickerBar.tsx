import { VersionSelect } from "./VersionSelect";
import type { VersionOption } from "./VersionSelect";

export interface VersionPickerBarProps {
    leftLabel?: string;
    rightLabel?: string;
    leftValue?: string;
    rightValue?: string;
    options: VersionOption[];
    onChangeLeft: (id: string) => void;
    onChangeRight: (id: string) => void;
    onSwap?: () => void;
}

export const VersionPickerBar = ({
    leftLabel = "원본",
    rightLabel = "수정본",
    leftValue,
    rightValue,
    options,
    onChangeLeft,
    onChangeRight,
    onSwap,
}: VersionPickerBarProps) => {
    return (
        <div
            className="
        w-full rounded-lg border bg-white/70 backdrop-blur p-3
        flex flex-col gap-2 md:flex-row md:items-center md:justify-between
      "
            role="group"
            aria-label="버전 선택"
        >
            <div className="flex items-center gap-3">
                <VersionSelect
                    label={leftLabel}
                    value={leftValue}
                    options={options}
                    onChange={onChangeLeft}
                />
                <button
                    type="button"
                    onClick={onSwap}
                    className="h-9 rounded-md border px-3 text-sm transition-colors
                     hover:bg-slate-50 active:scale-[0.98]"
                    aria-label="좌우 버전 바꾸기"
                    title="좌우 버전 바꾸기"
                >
                    ↔︎
                </button>
                <VersionSelect
                    label={rightLabel}
                    value={rightValue}
                    options={options}
                    onChange={onChangeRight}
                />
            </div>

            <div className="text-xs text-slate-500">선택한 두 버전을 좌우로 표시해 비교합니다.</div>
        </div>
    );
};
