import { type CSSProperties } from "react";

import kakaoSymbol from "@/features/authentication/assets/kakao-symbol.png";

import { cn } from "@/shared/lib/utils";

export interface KakaoAuthButtonProps {
    className?: string;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
}

export const KakaoAuthButton = ({
    className,
    width = "100%",
    height = "3rem",
}: KakaoAuthButtonProps) => {
    const onKakaoSignIn = () => {
        window.location.href = "https://api.kareer-fit.com/api/auth/login/kakao";
    };

    return (
        <button
            onClick={onKakaoSignIn}
            className={cn(
                "bg-[#FEE500] w-full h-12 rounded-md my-4 flex justify-center p-3 hover:cursor-pointer",
                "disabled:opacity-80",
                className,
            )}
            style={{ width, height }}
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
    );
};
