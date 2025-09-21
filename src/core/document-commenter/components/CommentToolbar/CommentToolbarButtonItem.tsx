import { cn } from "@/shared/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

export interface CommentToolbarButtonItemProps {
    icon: React.ReactNode;
    tooltip: string;
    className?: string;
    onClick: () => void;
}

export const CommentToolbarButtonItem = ({
    icon,
    tooltip,
    className,
    onClick,
}: CommentToolbarButtonItemProps) => {
    return (
        <li className="list-none">
            <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild aria-label={tooltip}>
                    <button
                        className={cn(
                            "aspect-square flex justify-center items-center cursor-pointer",
                            className,
                        )}
                        onClick={onClick}
                    >
                        {icon}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </li>
    );
};
