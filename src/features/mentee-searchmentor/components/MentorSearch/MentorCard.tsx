import { Star } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export interface MentorCardProps extends React.ComponentProps<"div"> {
    image: string | null;
    name: string;
    company: string;
    position: string;
    rating: number;
    ratingCount: number;
    menteesCount: number;
    price: number;
    intro?: string;
    onClickProfile?: () => void;
}

export const MentorCard = ({
    image,
    name,
    company,
    position,
    rating,
    ratingCount,
    menteesCount,
    price,
    intro,
    onClickProfile,
    className,
    ...props
}: MentorCardProps) => {
    return (
        <Card {...props} className={cn("rounded-xl border bg-white p-5 shadow-sm", className)}>
            <div className="flex items-start gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-muted ring-1 ring-black/5">
                    {image && (
                        <img
                            src={image}
                            alt={`${name} 프로필`}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold text-slate-900">{name}</div>
                    <div className="text-sm text-slate-600">
                        <span className="text-primary font-medium">{company}</span>
                        <span className="mx-1.5 text-slate-400">·</span>
                        {position}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-700">
                        <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                        <span className="font-medium">{rating.toFixed(1)}</span>
                        <span className="text-slate-500">({ratingCount}개 리뷰)</span>
                        <span className="mx-1.5 text-slate-300">·</span>
                        <span className="text-slate-600">멘티 {menteesCount}명</span>
                    </div>
                </div>
            </div>

            {intro && <p className="mt-3 line-clamp-2 text-sm text-slate-600">{intro}</p>}

            <div className="mt-4 flex items-center justify-between">
                <div className="text-lg font-bold">
                    {price.toLocaleString()}원 <span className="text-sm font-medium">/ 세션</span>
                </div>
                <Button variant="secondary" onClick={onClickProfile}>
                    프로필 보기
                </Button>
            </div>
        </Card>
    );
};
