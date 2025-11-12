import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { ArrowLeft } from "lucide-react";

import {
    MentorDetailHeader,
    MentorDetailTabs,
    MentorTabPanel,
    MentorIntroSection,
    MentorReviewsSection,
    ReviewWriteModal,
    MentoringRequestModal,
    getMentorHeaderById,
    getMentorIntroductionById,
    getMentorReviewsById,
    useCreateReview,
    type MentorHeader,
    type MentorIntroduction,
    type MentorReviewAggregate,
} from "@/features/mentee-searchmentor";
import type {
    GetMentorHeaderByIdResponseBody,
    GetMentorIntroductionByIdResponseBody,
    GetMentorReviewsByIdResponseBody,
} from "@/features/mentee-searchmentor/services";

import { Button } from "@/shared/ui/button";
import { PageLoading } from "@/shared/ui/page-loading";

function mapHeaderResponse(response: GetMentorHeaderByIdResponseBody): MentorHeader {
    return {
        ...response,
    };
}

function mapIntroductionResponse(
    response: GetMentorIntroductionByIdResponseBody,
): MentorIntroduction {
    return {
        introduction: response.introduction,
        educations: response.educations,
        expertises: response.expertises,
        certifications: response.certifications,
        careers: response.careers,
    };
}

function mapReviewsResponse(response: GetMentorReviewsByIdResponseBody): MentorReviewAggregate {
    return {
        reviewCount: response.reviewCount,
        averageRating: response.averageRating,
        reviews: response.reviews,
    };
}

export default function MenteeDetailMentorPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const mentorId = id ? Number(id) : null;

    const [header, setHeader] = useState<MentorHeader | null>(null);
    const [intro, setIntro] = useState<MentorIntroduction | null>(null);
    const [reviews, setReviews] = useState<MentorReviewAggregate | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isMentoringRequestModalOpen, setIsMentoringRequestModalOpen] = useState(false);

    const createReviewMutation = useCreateReview(mentorId ?? 0);

    const loadData = async (id: number) => {
        try {
            setIsLoading(true);
            setError(null);

            const [headerData, introData, reviewsData] = await Promise.all([
                getMentorHeaderById(id),
                getMentorIntroductionById(id),
                getMentorReviewsById(id),
            ]);

            if (!headerData) {
                setError("멘토를 찾을 수 없습니다.");
                return;
            }

            setHeader(mapHeaderResponse(headerData));
            setIntro(mapIntroductionResponse(introData));
            setReviews(mapReviewsResponse(reviewsData));
        } catch (err) {
            setError("데이터를 불러오는 중 오류가 발생했습니다.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!mentorId || isNaN(mentorId)) {
            setError("유효하지 않은 멘토 ID입니다.");
            setIsLoading(false);
            return;
        }

        void loadData(mentorId);
    }, [mentorId]);

    if (isLoading) {
        return <PageLoading message="멘토 정보를 불러오는 중..." />;
    }

    if (error || !header || !intro || !reviews) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-6">
                <div className="rounded-xl border bg-white p-8 text-center">
                    <h2 className="mb-2 text-lg font-semibold text-slate-900">
                        {error || "멘토 정보를 불러올 수 없습니다."}
                    </h2>
                    <button
                        onClick={() => navigate("/mentee/search")}
                        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        멘토 찾기로 돌아가기
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-6">
            <Button
                variant="ghost"
                onClick={() => navigate("/mentee/search")}
                className="mb-4 -ml-2"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                멘토 찾기로 돌아가기
            </Button>

            <MentorDetailHeader
                image={header.profileImageUrl}
                name={header.name}
                company={header.company}
                position={header.jobPosition}
                rating={header.averageRating}
                ratingCount={header.reviewsCount}
                experience={header.experience}
                menteesCount={header.menteesCount}
                price={header.pricePerSession}
                onApply={() => setIsMentoringRequestModalOpen(true)}
            />

            <MentorDetailTabs defaultTab="소개">
                <MentorTabPanel when="소개">
                    <MentorIntroSection
                        introduction={intro.introduction}
                        expertises={intro.expertises}
                        educations={intro.educations}
                        certifications={intro.certifications}
                        careers={intro.careers}
                    />
                </MentorTabPanel>

                <MentorTabPanel when="리뷰">
                    <MentorReviewsSection
                        average={reviews.averageRating}
                        total={reviews.reviewCount}
                        reviews={reviews.reviews}
                        onWriteReview={() => setIsReviewModalOpen(true)}
                    />
                </MentorTabPanel>
            </MentorDetailTabs>

            {mentorId && (
                <>
                    <ReviewWriteModal
                        open={isReviewModalOpen}
                        onClose={() => setIsReviewModalOpen(false)}
                        onSubmit={async (rating, content) => {
                            if (!mentorId) return;
                            await createReviewMutation.mutateAsync({ rating, content });
                            await loadData(mentorId);
                        }}
                    />
                    <MentoringRequestModal
                        open={isMentoringRequestModalOpen}
                        onClose={() => setIsMentoringRequestModalOpen(false)}
                        mentorId={mentorId}
                        mentorName={header.name}
                        onSuccess={() => {}}
                    />
                </>
            )}
        </main>
    );
}
