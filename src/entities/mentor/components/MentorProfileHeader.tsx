import { Camera } from "lucide-react";

import type { GetMentorProfileResponse } from "@/entities/mentor/service/getMentorProfile";

import defaultProfileImage from "@/shared/assets/defaultProfile.png";

export type MentorProfileHeaderProps = Pick<
    GetMentorProfileResponse,
    "name" | "email" | "profileImageUrl" | "careerYears" | "company" | "phoneNumber"
>;

export const MentorProfileHeader = ({
    name,
    email,
    profileImageUrl,
    careerYears,
    company,
    phoneNumber,
}: MentorProfileHeaderProps) => {
    return (
        <header className="flex items-center gap-4 py-4 border-b">
            <picture className="relative">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
                    <img
                        alt="프로필 이미지"
                        src={profileImageUrl || defaultProfileImage}
                        className="h-full w-full object-cover"
                    />
                </div>
                <button
                    type="button"
                    className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1.5 cursor-pointer "
                    onClick={() => {}}
                >
                    <Camera className="h-4 w-4" />
                </button>
            </picture>

            <section className="flex-1">
                <p className="font-semibold">
                    {name} · {company} {careerYears}년 차
                </p>
                <p className="text-sm text-muted-foreground">{email}</p>
                <p className="text-sm text-muted-foreground">{phoneNumber}</p>
            </section>
        </header>
    );
};
