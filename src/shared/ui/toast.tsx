import { X } from "lucide-react";

import { useToast, type Toast as ToastType } from "@/shared/lib/toast";
import { cn } from "@/shared/lib/utils";

export const Toaster = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

interface ToastItemProps {
    toast: ToastType;
    onClose: () => void;
}

const ToastItem = ({ toast, onClose }: ToastItemProps) => {
    const variantStyles = {
        success: "bg-green-50 text-green-900 border-green-200",
        error: "bg-red-50 text-red-900 border-red-200",
        info: "bg-blue-50 text-blue-900 border-blue-200",
    };

    const iconColors = {
        success: "text-green-600",
        error: "text-red-600",
        info: "text-blue-600",
    };

    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg min-w-[300px] max-w-md",
                variantStyles[toast.type],
            )}
        >
            <div className="flex-1 text-sm font-medium">{toast.message}</div>
            <button
                type="button"
                onClick={onClose}
                className={cn(
                    "inline-flex items-center justify-center rounded-md p-1 hover:bg-black/5",
                    iconColors[toast.type],
                )}
            >
                <X size={16} />
            </button>
        </div>
    );
};
