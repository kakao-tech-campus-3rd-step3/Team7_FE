import { cn } from "@/shared/lib/utils";

export interface VersionNavItemProps {
    variant?: "original" | "modified";
    label?: string;
    controller?: React.ReactNode;
}

export const VersionNavItem = ({
    variant = "original",
    label,
    controller,
}: VersionNavItemProps) => {
    const isOriginalVersion = variant === "original";

    return (
        <li
            className={cn(
                "h-12 w-full list-none flex justify-between items-center px-2 border-b border-gray-200",
                isOriginalVersion ? "bg-blue-500/20" : "bg-green-500/20",
            )}
        >
            <div className="flex items-center">
                <div
                    className={cn(
                        "mx-4 w-3 h-3 rounded-full",
                        isOriginalVersion ? "bg-blue-500" : "bg-green-500",
                    )}
                />
                <p
                    className={cn(
                        "font-semibold",
                        isOriginalVersion ? "text-blue-600" : "text-green-600",
                    )}
                >
                    {label}
                </p>
            </div>

            <div>{controller}</div>
        </li>
    );
};
