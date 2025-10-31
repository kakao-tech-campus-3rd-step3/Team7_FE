import { cn } from "@/shared/lib/utils";

import type { Review, ReviewCounts } from "../../models/types";
import { TABS } from "../../models/types";

export interface MentorReviewTabsProps {
    active: Review;
    counts: ReviewCounts;
    onChange: (next: Review) => void;
    className?: string;
}

export const MentorReviewTabs = ({
    active,
    counts,
    onChange,
    className,
}: MentorReviewTabsProps) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            {TABS.map((tab) => {
                const isActive = active === tab.key;
                const count = counts[tab.key];

                return (
                    <button
                        type="button"
                        key={tab.key}
                        onClick={() => onChange(tab.key)}
                        className={cn(
                            "h-9 rounded-md border px-3 text-sm transition",
                            isActive
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200",
                        )}
                    >
                        {tab.label}
                        <span
                            className={cn(
                                "ml-2 inline-flex h-5 min-w-[20px] items-center justify-center text-xs",
                                isActive ? "bg-white text-blue-700" : "bg-slate-100 text-slate-700",
                            )}
                        >
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
