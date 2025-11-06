import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { jwtDecode } from "jwt-decode";

import type { JwtSchema } from "@/features/authentication/schema/JwtSchema";
import { useAuthStore } from "@/features/authentication/store/authStore";

export default function RedirectPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setTokens, setRole } = useAuthStore();

    useEffect(() => {
        const isNewUser = searchParams.get("isNewUser");
        const oauthId = searchParams.get("oauthId");
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");

        if (isNewUser === "true") {
            navigate("/auth/role?oauthId=" + oauthId);
        } else {
            if (accessToken && refreshToken) {
                const decoded: JwtSchema = jwtDecode(accessToken);
                const role = decoded.roles[0];

                setRole(role);
                setTokens(accessToken, refreshToken);

                if (role === "ROLE_MENTOR") {
                    navigate("/mentor/dashboard");
                } else {
                    navigate("/mentee/dashboard");
                }
            } else {
                navigate("/auth/login");
            }
        }
    }, [navigate, searchParams, setRole, setTokens]);

    return (
        <main>
            <h1>Redirecting...</h1>
        </main>
    );
}
