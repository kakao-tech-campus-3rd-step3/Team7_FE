export interface MentorIntroSectionProps {
    introduction: string;
    expertises: Array<{ expertiseName: string }>;
    educations: Array<{
        schoolName: string;
        major: string;
        startYear: number;
        endYear: number;
    }>;
    certifications: Array<{ certificateName: string }>;
    careers: Array<{
        companyName: string;
        position: string;
        startDate: string;
        endDate: string;
    }>;
}

export const MentorIntroSection = ({
    introduction,
    expertises,
    educations,
    certifications,
    careers,
}: MentorIntroSectionProps) => {
    return (
        <section className="space-y-12">
            <div>
                <h3 className="text-lg font-semibold text-slate-900">멘토 소개</h3>
                <p className="mt-4 whitespace-pre-line text-base text-slate-700 leading-relaxed">
                    {introduction}
                </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-slate-900">전문 분야</h3>
                <ul className="mt-4 grid gap-4">
                    {expertises.map((expertise, index) => (
                        <li key={index} className="flex items-start gap-3 text-base text-slate-700">
                            <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-blue-500" />
                            {expertise.expertiseName}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-slate-900">학력 및 자격증</h3>
                <ul className="mt-4 space-y-4">
                    {educations.map((education, index) => (
                        <li key={index} className="text-base text-slate-700">
                            {education.schoolName} {education.major} ({education.startYear} -{" "}
                            {education.endYear})
                        </li>
                    ))}
                    {certifications.map((certification, index) => (
                        <li key={`certification-${index}`} className="text-base text-slate-700">
                            {certification.certificateName}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-slate-900">경력</h3>
                <ul className="mt-4 space-y-4">
                    {careers.map((career, index) => (
                        <li key={index} className="text-base text-slate-700">
                            {career.companyName} · {career.position} ({career.startDate} ~{" "}
                            {career.endDate || "현재"})
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
