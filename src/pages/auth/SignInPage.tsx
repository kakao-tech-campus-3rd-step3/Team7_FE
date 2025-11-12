import { Link, useNavigate } from "react-router";

import { jwtDecode } from "jwt-decode";

import authBackground from "@/features/authentication/assets/auth-bg.png";
import { KakaoAuthButton } from "@/features/authentication/components/KakaoAuthButton";
import type { JwtSchema } from "@/features/authentication/schema/JwtSchema";
import { useSignInMentee } from "@/features/authentication/services/signInMentee";
import { useSignInMentor } from "@/features/authentication/services/signInMentor";
import { useAuthStore } from "@/features/authentication/store/authStore";

import { Button } from "@/shared/ui/button";

export default function SignInPage() {
    const navigate = useNavigate();
    const { setTokens, setRole, setId } = useAuthStore();
    const { mutate: signInMentee } = useSignInMentee();
    const { mutate: signInMentor } = useSignInMentor();

    const onMentorLogin = () => {
        signInMentor(undefined, {
            onSuccess: (data) => {
                const decoded: JwtSchema = jwtDecode(data.accessToken);
                const role = decoded.roles[0];

                setId(Number(decoded.sub));
                setRole(role);
                setTokens(data.accessToken, data.refreshToken);

                navigate("/mentor/dashboard");
            },
        });
    };

    const onMenteeLogin = () => {
        signInMentee(undefined, {
            onSuccess: (data) => {
                const decoded: JwtSchema = jwtDecode(data.accessToken);
                const role = decoded.roles[0];

                setId(Number(decoded.sub));
                setRole(role);
                setTokens(data.accessToken, data.refreshToken);

                navigate("/mentee/dashboard");
            },
        });
    };

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

                <div className="flex gap-1">
                    <Button variant="outline" className="flex-1" onClick={onMentorLogin}>
                        멘토 테스트 로그인
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={onMenteeLogin}>
                        멘티 테스트 로그인
                    </Button>
                </div>

                <footer className="w-full text-center text-sm text-gray-400">
                    <Link to="/">메인 페이지로 돌아가기</Link>
                </footer>
            </section>
        </main>
    );
}
