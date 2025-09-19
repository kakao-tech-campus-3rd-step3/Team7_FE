import { type CSSProperties } from "react";

export interface CommentAreaPlaceholderProps {
    borderColor: CSSProperties["borderColor"];
    backgroundColor: CSSProperties["backgroundColor"];
    style: CSSProperties;
}

export const CommentAreaPlaceholder = ({
    style,
    borderColor,
    backgroundColor,
}: CommentAreaPlaceholderProps) => {
    return (
        <mark
            style={{
                position: "absolute",
                border: `1px dashed ${borderColor}`,
                backgroundColor,
                ...style,
            }}
        />
    );
};
