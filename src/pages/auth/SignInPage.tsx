import { useCallback } from "react";
import { Link } from "react-router";

import authBackground from "@/features/authentication/assets/auth-bg.png";
import kakaoSymbol from "@/features/authentication/assets/kakao-symbol.png";

import { cn } from "@/shared/lib/utils";

export default function SignInPage() {
    const onKakaoSignIn = useCallback(() => {
        window.location.href = "https://api.kareer-fit.com/api/auth/login/kakao";
    }, []);

    return (
        <main className="w-full h-screen flex items-center justify-center relative">
            <img
                src={authBackground}
                className="absolute w-screen h-screen object-cover z-[-1] opacity-40"
            />

            <section className="rounded-sm bg-white w-full max-w-96 p-4 absolute z-10">
                <header className="text-center">
                    <img
                        src="/logo.svg"
                        alt="KareerFit"
                        className="block mx-auto my-2"
                        width={120}
                    />
                    <h1 className="text-2xl font-semibold">로그인하여 시작하세요</h1>
                    <p className="my-2 text-sm">현직자 멘토의 진짜 피드백을 받아보세요</p>
                </header>

                <button
                    onClick={onKakaoSignIn}
                    className={cn(
                        "bg-[#FEE500] w-full h-12 rounded-md my-4 flex justify-center p-3 hover:cursor-pointer",
                        "disabled:opacity-80",
                    )}
                >
                    <img
                        src={kakaoSymbol}
                        alt="카카오 로그인"
                        width={20}
                        height={20}
                        className="block object-contain"
                    />
                    <span className="mx-2 font-semibold">카카오로 3초 만에 시작하기</span>
                </button>

                <footer className="w-full text-center text-sm text-gray-400">
                    <Link to="/">메인 페이지로 돌아가기</Link>
                </footer>
            </section>
        </main>
    );
}
