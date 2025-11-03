import { Spinner } from "@/shared/components/Spinner/Spinner";

export interface PageLoadingProps {
    message?: string;
    description?: string;
    size?: number;
}

export function PageLoading({ message = "로딩 중...", description, size = 40 }: PageLoadingProps) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Spinner size={size} />
                <div className="text-center">
                    <div className="mb-1 text-lg font-medium text-slate-900">{message}</div>
                    {description && <div className="text-sm text-slate-600">{description}</div>}
                </div>
            </div>
        </div>
    );
}
