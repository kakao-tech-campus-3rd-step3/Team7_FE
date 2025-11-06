import { Suspense } from "react";

import { MentorProfileTabs, useMentorProfile } from "@/features/mentor-profile";

import { getCurrentMentorId } from "@/shared/lib/auth";
import { toast } from "@/shared/lib/toast";
import { Card, CardContent } from "@/shared/ui/card";
import { PageLoading } from "@/shared/ui/page-loading";
import { QueryErrorBoundary } from "@/shared/ui/query-error-boundary";

function MentorSettingsContent() {
    const mentorId = getCurrentMentorId();
    const { profile, save, isSaving } = useMentorProfile(mentorId);

    return (
        <div className="mx-auto max-w-5xl p-30">
            <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-6">
                    <div className="mb-4">
                        <h1 className="text-2xl font-semibold">프로필 설정</h1>
                        <p className="text-sm text-muted-foreground">
                            멘토 프로필 정보를 조회합니다.
                        </p>
                    </div>
                    <MentorProfileTabs
                        profile={profile}
                        isSaving={isSaving}
                        onSave={async (partial) => {
                            await save(partial);
                            toast.success("저장되었습니다.");
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default function MentorSettingsPage() {
    return (
        <QueryErrorBoundary>
            <Suspense fallback={<PageLoading description="프로필 정보를 불러오고 있습니다." />}>
                <MentorSettingsContent />
            </Suspense>
        </QueryErrorBoundary>
    );
}
