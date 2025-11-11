import type { GetMentorProfileResponse } from "@/entities/mentor/service/getMentorProfile";

import { Input } from "@/shared/ui/input";

export type MentorProfileEducationProps = Pick<GetMentorProfileResponse, "educations">;

export const MentorProfileEducation = ({ educations }: MentorProfileEducationProps) => {
    return (
        <section>
            <h2 className="mb-2 text-sm font-medium">학력</h2>

            <div className="space-y-3">
                {educations.map((education, index) => {
                    return (
                        <article className="grid grid-cols-2 gap-3" key={index}>
                            <div>
                                <div className="mb-1.5 text-xs text-muted-foreground">학교명</div>
                                <Input
                                    placeholder="예: OO대학교"
                                    defaultValue={education.schoolName}
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-xs text-muted-foreground">전공</h3>
                                <Input placeholder="예: OO학과" defaultValue={education.major} />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-xs text-muted-foreground">입학년도</h3>
                                <Input
                                    type="number"
                                    placeholder="예: 20XX"
                                    min="1900"
                                    max="2100"
                                    defaultValue={education.startYear}
                                />
                            </div>
                            <div>
                                <h3 className="mb-1.5 text-xs text-muted-foreground">졸업년도</h3>
                                <Input
                                    type="number"
                                    placeholder="예: 20YY"
                                    min="1900"
                                    max="2100"
                                    defaultValue={education.endYear}
                                />
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
