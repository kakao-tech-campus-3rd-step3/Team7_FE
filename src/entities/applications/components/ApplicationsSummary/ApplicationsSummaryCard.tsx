import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export interface ApplicationsSummaryCardProps extends HTMLAttributes<HTMLElement> {
    companyName: string;
    applyPosition: string;

    location: string;
    jobType: string;
    field: string;
    progress: number;

    jobPostingUrl?: string;
}

interface CardHeaderProps {
    companyName: string;
    applyPosition: string;

    location: string;
    jobType: string;
    field: string;
    actions?: ReactNode;
}
const CardHeader = ({
    companyName,
    applyPosition,

    location,
    jobType,
    field,
    actions,
}: CardHeaderProps) => (
    <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
            <h2 className="truncate text-2xl font-bold text-gray-900">{companyName}</h2>
            <p className="truncate text-lg font-normal text-gray-600">{applyPosition}</p>

            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                <MetaBlock label="근무지" value={location} />
                <MetaBlock label="고용형태" value={jobType} />
                <MetaBlock label="경력" value={field} />
            </div>
        </div>

        {actions && <div className="ml-auto flex gap-2">{actions}</div>}
    </div>
);

interface CardProgressProps {
    progress: number;
}
const CardProgress = ({ progress }: CardProgressProps) => {
    const safe = Number.isFinite(progress) ? progress : 0;
    const clamped = Math.min(100, Math.max(0, safe));

    return (
        <div className="mt-6">
            <div className="mb-1 flex items-center justify-between text-sm text-gray-500">
                <span className="font-normal">전체 진행률</span>
                <span className="font-normal">{clamped}%</span>
            </div>
            <progress
                value={clamped}
                max={100}
                aria-label="전체 진행률"
                className={cn(
                    "h-2 w-full rounded-full",
                    "[&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray-200",
                    "[&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-300",
                    clamped >= 70
                        ? "[&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500"
                        : clamped >= 40
                          ? "[&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500"
                          : "[&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500",
                )}
            />
        </div>
    );
};

const MetaBlock = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
        <span className="text-sm font-normal text-gray-500">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
);

export const ApplicationsSummaryCard = ({
    companyName,
    applyPosition,

    location,
    jobType,
    field,
    progress,

    jobPostingUrl,
    ...rest
}: ApplicationsSummaryCardProps) => {
    return (
        <section
            {...rest}
            className={cn(
                "w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
                rest.className,
            )}
        >
            <CardHeader
                companyName={companyName}
                applyPosition={applyPosition}
                location={location}
                jobType={jobType}
                field={field}
                actions={
                    <Button
                        variant="outline"
                        className="text-base font-medium"
                        onClick={() => window.open(jobPostingUrl, "_blank")}
                    >
                        채용공고 보기
                    </Button>
                }
            />
            <CardProgress progress={progress} />
        </section>
    );
};
