import { cn } from "@/shared/lib/utils";

export interface FormActionsProps {
    disabled?: boolean;
    submitText?: string;
    onTempSave?: () => void;
}

export const FormActions = ({ disabled, submitText = "저장", onTempSave }: FormActionsProps) => {
    return (
        <div className="mt-6 flex items-center justify-end gap-2">
            <button
                type="button"
                onClick={onTempSave}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
                임시 저장
            </button>

            <button
                type="submit"
                disabled={!!disabled}
                className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium text-white",
                    disabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700",
                )}
            >
                {submitText}
            </button>
        </div>
    );
};
