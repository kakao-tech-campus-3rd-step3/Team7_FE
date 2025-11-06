import { Star } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export interface MentorDetailHeaderProps {
    image: string | null;
    name: string;
    company: string;
    position: string;
    rating: number;
    ratingCount: number;
    experience: number;
    menteesCount: number;
    price: number;
    onApply?: () => void;
}

export const MentorDetailHeader = ({
    image,
    name,
    company,
    position,
    rating,
    ratingCount,
    experience,
    menteesCount,
    price,
    onApply,
}: MentorDetailHeaderProps) => {
    return (
        <Card className="mt-2 rounded-xl border bg-white p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-8">
                    <div className="h-48 w-48 overflow-hidden rounded-xl bg-muted ring-2 ring-black/5">
                        {image && (
                            <img
                                src={image}
                                alt={`${name} 프로필`}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-4xl font-semibold text-slate-900">{name}</div>
                        <div className="text-xl text-slate-600">
                            <span className="text-primary font-medium">{company}</span>
                            <span className="mx-2 text-slate-400">·</span>
                            {position}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-lg text-slate-700">
                            <Star className="h-6 w-6 text-amber-500" fill="currentColor" />
                            <span className="font-medium">{rating.toFixed(1)}</span>
                            <span className="text-slate-500">({ratingCount}개 리뷰)</span>
                            <span className="mx-2 text-slate-300">·</span>
                            <span>경력 {experience}년</span>
                            <span className="mx-2 text-slate-300">·</span>
                            <span>멘티 {menteesCount}명</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-6">
                    <div className="text-4xl font-bold">
                        {price.toLocaleString()}원
                        <span className="ml-2 text-xl font-medium">/세션</span>
                    </div>
                    <Button onClick={onApply} size="lg" className="text-lg px-8 py-6">
                        멘토링 신청
                    </Button>
                </div>
            </div>
        </Card>
    );
};
