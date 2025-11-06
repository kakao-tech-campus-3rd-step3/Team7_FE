import { Link } from "react-router";

import authBackground from "@/features/authentication/assets/auth-bg.png";
import { KakaoAuthButton } from "@/features/authentication/components/KakaoAuthButton";

export default function SignInPage() {
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

                <KakaoAuthButton />

                <footer className="w-full text-center text-sm text-gray-400">
                    <Link to="/">메인 페이지로 돌아가기</Link>
                </footer>
            </section>
        </main>
    );
}
