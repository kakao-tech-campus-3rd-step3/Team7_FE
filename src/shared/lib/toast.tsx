import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: Toast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);

        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    useEffect(() => {
        const handleToastEvent = (event: CustomEvent<{ message: string; type: ToastType }>) => {
            const { message, type } = event.detail;
            addToast(message, type);
        };

        window.addEventListener("toast", handleToastEvent as EventListener);

        return () => {
            window.removeEventListener("toast", handleToastEvent as EventListener);
        };
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast는 ToastProvider 내에서 사용해야 합니다.");
    }
    return context;
}

export const toast = {
    success: (message: string) => {
        if (typeof window !== "undefined") {
            const event = new CustomEvent<{ message: string; type: ToastType }>("toast", {
                detail: { message, type: "success" },
            });
            window.dispatchEvent(event);
        }
    },
    error: (message: string) => {
        if (typeof window !== "undefined") {
            const event = new CustomEvent<{ message: string; type: ToastType }>("toast", {
                detail: { message, type: "error" },
            });
            window.dispatchEvent(event);
        }
    },
    info: (message: string) => {
        if (typeof window !== "undefined") {
            const event = new CustomEvent<{ message: string; type: ToastType }>("toast", {
                detail: { message, type: "info" },
            });
            window.dispatchEvent(event);
        }
    },
};
