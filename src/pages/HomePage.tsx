import { File, Goal, Star, User } from "lucide-react";

import { KakaoAuthButton } from "@/features/authentication/components/KakaoAuthButton";

import { CardContent } from "@/shared/ui/card";

export default function HomePage() {
    const topMentors = [
        {
            id: 1,
            name: "김현수",
            field: "백엔드",
            role: "Senior Software Engineer",
            rating: 4.9,
            reviewCount: 47,
            profileImageUrl: "",
        },
        {
            id: 2,
            name: "이지은",
            field: "프론트엔드",
            role: "Frontend Developer",
            rating: 4.8,
            reviewCount: 32,
            profileImageUrl: "/profile.png",
        },
        {
            id: 3,
            name: "박민호",
            field: "UX 디자인",
            role: "Cloud Architect",
            rating: 4.9,
            reviewCount: 51,
            profileImageUrl: "",
        },
    ];

    const features = [
        {
            icon: <User />,
            title: "검증된 현직자 멘토",
            description:
                "다양한 분야의 스타트업부터 대기업의 검증된 현직자들이 직접적인 조언을 제공합니다.",
        },
        {
            icon: <File />,
            title: "체계적인 서류 리뷰",
            description:
                "이력서, 포트폴리오, 자기소개서를 조건없이 피드백을 받으며 서류의 질을 향상시킵니다.",
        },
        {
            icon: <Goal />,
            title: "체계적인 진행 관리",
            description: "지원 현황과 피드백 일정을 한눈에 확인하고 체계적으로 관리할 수 있습니다.",
        },
    ];

    return (
        <main className="min-h-screen bg-background">
            <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[500px] flex items-center">
                <div className="max-w-6xl mx-auto px-4 text-center z-10">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        현직자 멘토의 진짜 피드백으로,
                        <br />
                        <span className="text-blue-600">당신의 합격률을 높이세요</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        실무 경험이 풍부한 현직자들의 당신에 이력서, 포트폴리오, 자기소개서를 꼼꼼히
                        리뷰하고 실전 면접 팁까지 제공합니다.
                    </p>
                    <KakaoAuthButton width="300px" className="mx-auto" />
                </div>

                <img
                    src="/hero.png"
                    alt=""
                    className="absolute inset-0 overflow-hidden w-full h-full object-cover opacity-40"
                />
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            이 주의 TOP 멘토
                        </h2>
                        <p className="text-lg text-gray-600">
                            이번 주 리뷰 점수를 기준으로 선정한 최고의 멘토들을 만나보세요
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {topMentors.map((mentor) => (
                            <article key={mentor.id} className="text-center border rounded-md">
                                <CardContent className="pt-8">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <img
                                            src={mentor.profileImageUrl}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {mentor.name}
                                    </h3>
                                    <p className="text-blue-600 font-medium mb-2">{mentor.field}</p>
                                    <p className="text-sm text-gray-600 mb-2">{mentor.role}</p>

                                    <div className="flex items-center justify-center mb-4">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-yellow-400">
                                                    <Star
                                                        size={18}
                                                        strokeWidth={1}
                                                        fill="oklch(85.2% 0.199 91.936)"
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm font-medium">
                                            {mentor.rating}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-6">
                                        후기 {mentor.reviewCount}건
                                    </p>
                                </CardContent>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            왜 Career-Fit인가?
                        </h2>
                        <p className="text-lg text-gray-600">
                            취업 성공을 위한 모든 것이 여기에 있습니다
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <article key={index} className="text-center border rounded-md p-4">
                                <div className="p-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <span className="text-3xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-tight text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        합격률을 높이는 여정, 지금 바로 시작하세요
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        수많은 취준생이 Career-Fit을 통해 꿈의 회사에 입사하고 있습니다.
                    </p>
                    <KakaoAuthButton width="300px" className="mx-auto" />
                </div>
            </section>

            <footer className="bg-gray-900 text-white py-12">
                <div className="mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        © 2025 Career-Fit. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}
