import { Suspense } from "react";

import { MentorProfileContainer } from "@/entities/mentor/containers/MentorProfile";

export default function MentorProfileSettingsPage() {
    return (
        <section className="mx-auto">
            <article className="bg-white">
                <div className="p-6 h-full">
                    <div className="mb-4">
                        <h1 className="text-2xl font-semibold">프로필 설정</h1>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <MentorProfileContainer />
                    </Suspense>
                </div>
            </article>
        </section>
    );
}
