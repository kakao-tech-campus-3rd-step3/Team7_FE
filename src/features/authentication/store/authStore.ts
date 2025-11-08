import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

export const Role = {
    MENTOR: "ROLE_MENTOR",
    MENTEE: "ROLE_MENTEE",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];

interface AuthState {
    role: RoleType | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
    setRole: (role: RoleType) => void;
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

            setRole: (role: RoleType) => {
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
