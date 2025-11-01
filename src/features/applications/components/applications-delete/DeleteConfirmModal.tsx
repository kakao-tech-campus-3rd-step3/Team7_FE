import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export interface DeleteConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    className?: string;
}

export const DeleteConfirmModal = ({
    open,
    onClose,
    onConfirm,
    className,
}: DeleteConfirmModalProps) => {
    if (!open) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60]">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div
                className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[92vw] max-w-[400px] rounded-xl bg-white shadow-xl",
                    className,
                )}
            >
                <div className="px-6 py-5 border-b">
                    <h3 className="text-base font-semibold text-slate-900">지원서 삭제</h3>
                    <p className="mt-1 text-sm text-slate-500">
                        지원서를 삭제하시겠습니까?
                    </p>
                </div>

                <div className="px-6 py-5">
                    <div className="flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            onClick={handleConfirm}
                            className="bg-[#2563EB] text-white hover:bg-[#1E4FD9] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            예
                        </Button>
                        <Button type="button" variant="outline" onClick={onClose}>
                            아니오
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

