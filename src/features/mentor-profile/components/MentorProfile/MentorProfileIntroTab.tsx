import { useMemo, useState, useEffect } from "react";

import { Camera, Loader2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import type { MentorProfile } from "../../models/types";
import { MentorProfileTagInput } from "./MentorProfileTagInput";

export interface MentorProfileIntroTabProps {
    profile: MentorProfile;
    onChange: (partial: Partial<MentorProfile>) => Promise<void> | void;
    isSaving?: boolean;
    className?: string;
}

export function MentorProfileIntroTab({
    profile,
    onChange,
    isSaving,
    className,
}: MentorProfileIntroTabProps) {
    const [formData, setFormData] = useState<MentorProfile>(profile);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const expertiseTagNames = useMemo(
        () => formData.expertises.map((expertise) => expertise.expertiseName),
        [formData.expertises],
    );

    const handleExpertiseChange = (tagNames: string[]) => {
        setFormData((prev) => ({
            ...prev,
            expertises: tagNames.map((tagName) => ({ expertiseName: tagName })),
        }));
    };

    const handleSave = async () => {
        const updatePayload: Partial<MentorProfile> = {
            introduction: formData.introduction,
            profileImageUrl: formData.profileImageUrl,
            expertises: formData.expertises,
            educations: formData.educations,
            certifications: formData.certifications,
        };

        await onChange(updatePayload);
    };

    const handleProfileImageUrlChange = (url: string) => {
        const trimmedUrl = url.trim();
        setFormData((prev) => ({ ...prev, profileImageUrl: trimmedUrl || undefined }));
    };

    return (
        <div className={cn(className)}>
            <div className="flex items-center gap-4 py-4 border-b">
                <div className="relative">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
                        {formData.profileImageUrl && (
                            <img
                                alt="profile"
                                src={formData.profileImageUrl}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer hover:opacity-90 shadow-sm"
                        onClick={() => {
                            const url = prompt(
                                "이미지 URL을 입력해주세요:",
                                formData.profileImageUrl ?? "",
                            );
                            if (url !== null) {
                                handleProfileImageUrlChange(url);
                            }
                        }}
                    >
                        <Camera className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1">
                    <div className="font-semibold">{formData.name}</div>
                    <div className="text-sm text-muted-foreground">{formData.email}</div>
                </div>
            </div>

            <div className="mt-6 space-y-6">
                <div>
                    <div className="mb-2 text-sm font-medium">멘토 소개</div>
                    <textarea
                        value={formData.introduction ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setFormData((prev) => ({ ...prev, introduction: e.target.value }))
                        }
                        placeholder="간단한 소개를 입력해주세요."
                        className="flex min-h-[84px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring"
                    />
                </div>

                <MentorProfileTagInput
                    label="전문 분야"
                    value={expertiseTagNames}
                    onChange={handleExpertiseChange}
                    placeholder="예: 백엔드개발"
                />

                <div>
                    <div className="mb-2 text-sm font-medium">학력</div>
                    <Input
                        value={
                            formData.educations[0]
                                ? `${formData.educations[0].schoolName} ${formData.educations[0].major} (${formData.educations[0].startYear}-${formData.educations[0].endYear ?? ""})`
                                : ""
                        }
                        onChange={(e) => {
                            const inputValue = e.target.value;

                            if (!inputValue.trim()) {
                                setFormData((prev) => ({
                                    ...prev,
                                    educations: [],
                                }));
                                return;
                            }

                            const currentEducation = formData.educations[0];
                            const parts = inputValue.trim().split(" ");

                            if (!parts[0] || parts[0].length === 0) {
                                setFormData((prev) => ({
                                    ...prev,
                                    educations: [],
                                }));
                                return;
                            }

                            setFormData((prev) => ({
                                ...prev,
                                educations: [
                                    {
                                        schoolName: parts[0] ?? "",
                                        major: parts[1] ?? "",
                                        startYear: currentEducation?.startYear ?? 2012,
                                        endYear: currentEducation?.endYear ?? 2016,
                                    },
                                ],
                            }));
                        }}
                        placeholder="예: OO대학교 OO학과 학사 (20XX-20YY)"
                    />
                </div>

                <div>
                    <div className="mb-2 text-sm font-medium">자격증</div>
                    <textarea
                        value={formData.certifications
                            .map((cert) => cert.certificateName)
                            .join(", ")}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            const certificateNames = e.target.value
                                .split(",")
                                .map((name) => name.trim())
                                .filter(Boolean);
                            setFormData((prev) => ({
                                ...prev,
                                certifications: certificateNames.map((name) => ({
                                    certificateName: name,
                                })),
                            }));
                        }}
                        placeholder="예: 정보처리기사"
                        className="flex min-h-[80px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setFormData(profile)}>
                        취소
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="gap-1">
                        {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                        저장하기
                    </Button>
                </div>
            </div>
        </div>
    );
}
