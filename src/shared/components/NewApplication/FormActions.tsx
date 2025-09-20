import { cn } from "@/shared/lib/utils";

export interface FormActionsProps {
    disabled?: boolean;
    onTempSave?: () => void;
    submitText?: string;
}

export const FormActions = ({ disabled, onTempSave, submitText = "저장" }: FormActionsProps) => {
    return (
        <div className="mt-6 flex items-center justify-between gap-3">
            <button
                type="button"
                onClick={onTempSave}
                className={cn(
                    "inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700",
                    "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                )}
            >
                임시 저장
            </button>

            <button
                type="submit"
                disabled={disabled}
                className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    disabled
                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                        : "bg-[#2563EB] text-white hover:bg-[#1E40AF]",
                )}
            >
                {submitText}
            </button>
        </div>
    );
};
