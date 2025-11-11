import type { GetMentorProfileResponse } from "@/entities/mentor/service/getMentorProfile";

import { Badge } from "@/shared/ui/badge";

export type MentorProfileCertificationProps = Pick<GetMentorProfileResponse, "certifications">;

export const MentorProfileCertification = ({ certifications }: MentorProfileCertificationProps) => {
    return (
        <section>
            <h2 className="mb-2 text-sm font-medium">자격증</h2>

            <div>
                {certifications.map(({ certificateName }) => {
                    return (
                        <Badge key={certificateName} className="mr-2 mb-2">
                            {certificateName}
                        </Badge>
                    );
                })}
            </div>
        </section>
    );
};
