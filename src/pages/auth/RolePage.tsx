import { useNavigate, useSearchParams } from "react-router";

import { User, UserCheck } from "lucide-react";

import authBackground from "@/features/authentication/assets/auth-bg.png";

export default function RolePage() {
    const [searchParams] = useSearchParams();
    const oauthId = searchParams.get("oauthId") || "";
    const navigate = useNavigate();

    const onSelectMentee = () => {
        navigate("/auth/register/mentee?oauthId=" + oauthId);
    };

    const onSelectMentor = () => {
        navigate("/auth/register/mentor?oauthId=" + oauthId);
    };

    return (
        <main className="w-full h-screen flex items-center justify-center relative">
            <img
                src={authBackground}
                className="absolute w-screen h-screen object-cover z-[-1] opacity-40"
            />

            <section className="rounded-sm bg-white w-full max-w-[900px] p-8 absolute z-10">
                <header className="text-center mb-8">
                    <img
                        src="/logo.svg"
                        alt="KareerFit"
                        className="block mx-auto my-2"
                        width={120}
                    />
                    <h1 className="text-2xl font-semibold">환영합니다!</h1>
                    <p className="my-2 text-sm text-gray-600">어떤 역할로 시작하시겠어요?</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg p-6 text-left transition-all duration-200 hover:shadow-lg"
                        onClick={onSelectMentee}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-gray-200 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                                <User className="w-8 h-8 text-gray-600 group-hover:text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">멘티</h2>
                            <p className="text-sm text-gray-600 mb-6">
                                현직자 멘토에게 서류 피드백과 면접 코칭을 받아보세요
                            </p>

                            <div className="space-y-3 w-full">
                                <div className="flex items-center text-sm text-gray-700">
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    이력서, 자기소개서 피드백
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    면접 코칭 및 모의면접
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    커리어 상담
                                </div>
                            </div>
                        </div>
                    </button>

                    <button
                        className="group bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200 rounded-lg p-6 text-left transition-all duration-200 hover:shadow-lg"
                        onClick={onSelectMentor}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-gray-200 group-hover:bg-green-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                                <UserCheck className="w-8 h-8 text-gray-600 group-hover:text-green-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">멘토</h2>
                            <p className="text-sm text-gray-600 mb-6">
                                후배들의 성장을 도와주며 부수입도 얻어보세요
                            </p>

                            <div className="space-y-3 w-full">
                                <div className="flex items-center text-sm text-gray-700">
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    서류 검토 및 피드백
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    면접 코칭 제공
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    멘토링 수익 창출
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </section>
        </main>
    );
}
