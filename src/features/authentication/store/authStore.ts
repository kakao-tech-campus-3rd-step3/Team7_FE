import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
    role: "ROLE_MENTOR" | "ROLE_MENTEE" | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
    setRole: (role: "ROLE_MENTOR" | "ROLE_MENTEE") => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            role: null,

            setRole: (role: "ROLE_MENTOR" | "ROLE_MENTEE") => {
                set({ role });
            },

            setTokens: (accessToken: string, refreshToken: string) => {
                set({
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                });
            },

            clearTokens: () => {
                set({
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                });
            },

            getAccessToken: () => {
                return get().accessToken;
            },

            getRefreshToken: () => {
                return get().refreshToken;
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                role: state.role,
            }),
        },
    ),
);
