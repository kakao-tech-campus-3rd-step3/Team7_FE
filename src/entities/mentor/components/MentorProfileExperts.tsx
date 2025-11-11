import type { GetMentorProfileResponse } from "@/entities/mentor/service/getMentorProfile";

import { Badge } from "@/shared/ui/badge";

export type MentorProfileExpertsProps = Pick<GetMentorProfileResponse, "expertises">;

export const MentorProfileExperts = ({ expertises }: MentorProfileExpertsProps) => {
    return (
        <section>
            <h2 className="mb-2 text-sm font-medium">전문 분야</h2>

            <div>
                {expertises.map(({ expertiseName }) => {
                    return (
                        <Badge key={expertiseName} className="mr-2 mb-2">
                            {expertiseName}
                        </Badge>
                    );
                })}
            </div>
        </section>
    );
};
