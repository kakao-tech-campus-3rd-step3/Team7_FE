import { Plus } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export interface NewApplicationButtonProps {
    label?: string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "reset" | "submit";
}

export const NewApplicationButton = ({
    label = "신규 지원 추가",
    className,
    disabled,
    onClick,
    type = "button",
}: NewApplicationButtonProps) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "h-11 px-6 rounded-[4px] gap-2",
                "bg-[#2563EB] text-white hover:bg-[#1E4FD9]",
                className,
            )}
        >
            <Plus className="size-4" />
            <span>{label}</span>
        </Button>
    );
};
