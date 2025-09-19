import type { CSSProperties } from "react";

import type { Comment } from "@/core/document-commenter/models/Comment";

export interface CommentAreaProps extends Comment {
    // TODO : CommentAreaPlaceholder와 통합 고려
    // type: "placeholder" | "comment";

    borderColor: CSSProperties["borderColor"];
    backgroundColor: CSSProperties["backgroundColor"];

    style: CSSProperties;
}

export const CommentArea = ({
    // type,
    // content,

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
                border: `2px solid ${borderColor}`,
                pointerEvents: "none",
                cursor: "pointer",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    borderRadius: "50%",
                    backgroundColor: borderColor,
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "white",
                    pointerEvents: "auto",
                }}
            >
                {id}
            </div>
        </mark>
    );
};
