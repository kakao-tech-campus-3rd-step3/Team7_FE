export interface MentorHeader {
    id: number;
    name: string;
    company: string;
    jobPosition: string;
    profileImageUrl: string | null;
    averageRating: number;
    reviewsCount: number;
    experience: number;
    menteesCount: number;
    pricePerSession: number;
}

export interface MentorListItem extends MentorHeader {
    shortIntro?: string;
}

export interface MentorIntroduction {
    introduction: string;
    educations: Array<{
        schoolName: string;
        major: string;
        startYear: number;
        endYear: number;
    }>;
    expertises: Array<{ expertiseName: string }>;
    certifications: Array<{ certificateName: string }>;
    careers: Array<{
        companyName: string;
        position: string;
        startDate: string;
        endDate: string;
    }>;
}

export interface MentorReviewAggregate {
    reviewCount: number;
    averageRating: number;
    reviews: Array<MentorReview>;
}

export interface MentorReview {
    reviewId: number;
    reviewerId: number;
    reviewerName: string;
    rating: number;
    content: string;
    createdAt: string;
}

export type SortBy = "RECOMMENDED" | "RATING" | "PRICE_LOW" | "PRICE_HIGH";
export type SortOrder = "ASC" | "DESC";

export interface SearchQuery {
    search?: string;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
    page?: number;
    size?: number;
}
