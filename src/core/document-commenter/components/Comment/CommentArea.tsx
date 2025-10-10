import type { CSSProperties } from "react";

import { CircleAlert } from "lucide-react";

import { Spinner } from "@/shared/components/Spinner/Spinner";
import { cn } from "@/shared/lib/utils";

import type { CommentSchema } from "@/core/document-commenter/models/CommentSchema";

export interface CommentAreaProps extends CommentSchema {
    // TODO : CommentAreaPlaceholder와 통합 고려
    // type: "placeholder" | "comment";

    borderColor: CSSProperties["borderColor"];
    backgroundColor: CSSProperties["backgroundColor"];

    style: CSSProperties;
}

export const CommentArea = ({
    // type,
    // content,
    status,

    id,

    startX,
    startY,
    endX,
    endY,

    borderColor,
    backgroundColor,
}: CommentAreaProps) => {
    return (
        <mark
            style={{
                position: "absolute",
                top: startY,
                left: startX,
                width: endX - startX,
                height: endY - startY,

                backgroundColor: backgroundColor,
                border: `1px solid ${borderColor}`,
                pointerEvents: "none",
                cursor: "pointer",
            }}
        >
            <CommentIndicator
                status={status}
                id={id}
                borderColor={borderColor}
                backgroundColor={backgroundColor}
            />
        </mark>
    );
};

export const CommentIndicator = ({
    status,
    id,
    borderColor,
    backgroundColor,
}: Partial<CommentAreaProps>) => {
    switch (status) {
        case "success":
            return (
                <div
                    className={cn(
                        "absolute top-[-10px] right-[-10px]",
                        "w-[20px] h-[20px] flex items-center justify-center rounded-full",
                        "text-xs font-bold text-white pointer-events-auto",
                    )}
                    style={{ backgroundColor: borderColor }}
                >
                    {id}
                </div>
            );
        case "pending":
            return (
                <div className="absolute top-[-10px] right-[-10px] rounded-full">
                    <Spinner size={20} trackColor={backgroundColor} fillColor={borderColor} />
                </div>
            );
        case "error":
            return (
                <div
                    className="absolute top-[-10px] right-[-10px] rounded-full"
                    style={{ backgroundColor: backgroundColor }}
                >
                    <CircleAlert size={20} color={borderColor} />
                </div>
            );
    }
};
