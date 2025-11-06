import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { useAuthStore } from "@/features/authentication/store/authStore";

export default function RedirectPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setTokens } = useAuthStore();

    useEffect(() => {
        const isNewUser = searchParams.get("isNewUser");
        const oauthId = searchParams.get("oauthId");
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");

        if (isNewUser === "true") {
            navigate("/auth/role?oauthId=" + oauthId);
        } else {
            if (accessToken && refreshToken) {
                setTokens(accessToken, refreshToken);
                navigate("/");
            } else {
                navigate("/auth/login");
            }
        }
    }, [navigate, searchParams, setTokens]);

    return (
        <main>
            <h1>Redirecting...</h1>
        </main>
    );
}
