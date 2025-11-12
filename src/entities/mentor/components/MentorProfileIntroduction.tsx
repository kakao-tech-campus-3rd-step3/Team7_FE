import type { GetMentorProfileResponse } from "@/entities/mentor/service/getMentorProfile";

import { Textarea } from "@/shared/ui/textarea";

export type MentorProfileIntroductionProps = Pick<GetMentorProfileResponse, "introduction">;

export const MentorProfileIntroduction = ({ introduction }: MentorProfileIntroductionProps) => {
    return (
        <section>
            <h2 className="mb-2 text-sm font-medium">멘토 소개</h2>
            <Textarea defaultValue={introduction} placeholder="간단한 소개를 입력해주세요." />
        </section>
    );
};
