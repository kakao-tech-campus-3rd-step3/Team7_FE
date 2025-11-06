import React, { forwardRef } from "react";

import { useEventBusSubscription } from "@/core/document-commenter/hooks/useEventBusSubscription";

export interface ViewportSurfaceProps extends React.ComponentProps<"div"> {
    children?: React.ReactNode;
}

export const BaseCoordinateLayer = forwardRef<HTMLDivElement, ViewportSurfaceProps>(
    ({ children, ...props }: ViewportSurfaceProps, ref) => {
        const { style, ...rest } = props;

        useEventBusSubscription("pan:move", (event) => {
            if (ref && "current" in ref && ref.current) {
                ref.current.style.transform = `translate(${event.dx}px, ${event.dy}px)`;
            }
        });

        return (
            <div
                ref={ref}
                {...rest}
                style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    willChange: "transform",

                    ...style,
                }}
            >
                {children}
            </div>
        );
    },
);
