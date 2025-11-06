import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
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
            }),
        },
    ),
);
