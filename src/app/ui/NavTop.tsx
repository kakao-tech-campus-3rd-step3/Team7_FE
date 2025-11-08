import { useNavigate } from "react-router";

import logo from "@/app/assets/logo.svg";

import { useAuthStore } from "@/features/authentication/store/authStore";

import { Button } from "@/shared/ui/button";

export const NAV_TOP_HEIGHT = 64;

export const NavTop = () => {
    const navigate = useNavigate();
    const { isAuthenticated, clearTokens } = useAuthStore();

    return (
        <nav className="w-full shadow-xs" style={{ height: NAV_TOP_HEIGHT }}>
            <ul className="w-full max-w-[1200px] mx-auto h-full px-4 flex items-center justify-between border-b">
                <li>
                    <img src={logo} alt="CareerFit 커리어핏" />
                </li>
                <li>
                    {isAuthenticated ? (
                        <Button
                            variant="destructive"
                            onClick={() => {
                                navigate("/");
                                clearTokens();
                            }}
                        >
                            로그아웃
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                navigate("/auth/signin");
                            }}
                        >
                            로그인
                        </Button>
                    )}
                </li>
            </ul>
        </nav>
    );
};
