import { useCallback } from "react";
import { Link } from "react-router";

import kakaoSymbol from "@/features/authentication/assets/kakao-symbol.png";

import { cn } from "@/shared/lib/utils";

export default function SignInPage() {
    const onKakaoSignIn = useCallback(() => {
        window.location.href = "http://api.kareer-fit.com:8080/api/auth/login/kakao";
    }, []);

    return (
        <main className="bg-gray-100 w-full h-screen flex items-center justify-center">
            <section className="rounded-sm bg-white w-full max-w-96 p-4">
                <header className="text-center">
                    <h1 className="text-2xl font-semibold text-primary">KareerFit</h1>
                    <h1 className="text-2xl font-semibold">로그인하여 시작하세요</h1>
                    <p>현직자 멘토의 진짜 피드백을 받아보세요</p>
                </header>

                <button
                    onClick={onKakaoSignIn}
                    className={cn(
                        "bg-[#FEE500] w-full h-12 rounded-md my-8 flex justify-center p-3 hover:cursor-pointer",
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

                <footer className="w-full text-center">
                    <Link to="/">메인 페이지로 돌아가기</Link>
                </footer>
            </section>
        </main>
    );
}
