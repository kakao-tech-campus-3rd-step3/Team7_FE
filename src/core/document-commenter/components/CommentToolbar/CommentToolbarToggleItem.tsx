import { cn } from "@/shared/lib/utils";
import { Toggle } from "@/shared/ui/toggle";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/ui/tooltip";

export interface CommentToolbarItemProps {
    icon: React.ReactNode;
    tooltip: string;
    onToggle: (value: boolean) => void;
}

export const CommentToolbarToggleItem = ({ icon, tooltip, onToggle }: CommentToolbarItemProps) => {
    return (
        <li className="list-none h-full flex items-center">
            <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild aria-label={tooltip}>
                    <Toggle
                        onPressedChange={onToggle}
                        className={cn(
                            "hover:bg-gray-100 dark:hover:bg-gray-800",
                            "[&[aria-pressed=true]]:!bg-blue-100 [&[aria-pressed=true]]:!text-blue-700",
                            "dark:[&[aria-pressed=true]]:!bg-blue-900 dark:[&[aria-pressed=true]]:!text-blue-300",
                        )}
                    >
                        {icon}
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </li>
    );
};
