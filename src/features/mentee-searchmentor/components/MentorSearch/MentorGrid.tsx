import { cn } from "@/shared/lib/utils";

import type { MentorListItem } from "../../models/types";
import { MentorCard } from "./MentorCard";

export interface MentorGridProps {
    items: MentorListItem[];
    onClickProfile?: (id: number) => void;
    className?: string;
}

export const MentorGrid = ({ items, onClickProfile, className }: MentorGridProps) => {
    return (
        <section className={cn("mt-4 rounded-xl border bg-white p-4 sm:p-5", className)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((mentor) => (
                    <MentorCard
                        key={mentor.id}
                        image={mentor.profileImageUrl}
                        name={mentor.name}
                        company={mentor.company}
                        position={mentor.jobPosition}
                        rating={mentor.averageRating}
                        ratingCount={mentor.reviewsCount}
                        menteesCount={mentor.menteesCount}
                        price={mentor.pricePerSession}
                        intro={mentor.shortIntro}
                        onClickProfile={
                            onClickProfile ? () => onClickProfile(mentor.id) : undefined
                        }
                    />
                ))}
            </div>
        </section>
    );
};
