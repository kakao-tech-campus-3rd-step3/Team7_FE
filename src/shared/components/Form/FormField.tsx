import { cn } from "@/shared/lib/utils";

export const inputClassName = (hasError?: boolean) =>
    cn(
        "mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-0",
        hasError
            ? "border-red-500 focus:border-red-500"
            : "border-slate-200 focus:border-slate-400",
    );

export type FormFieldProps = {
    label: string;
    error?: string;
    children: React.ReactNode;
};

export const FormField = ({ label, error, children }: FormFieldProps) => (
    <label className="block">
        <span className="block text-sm font-medium text-slate-700">{label}</span>
        {children}
        {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
);
