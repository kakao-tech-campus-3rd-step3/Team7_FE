import type { CSSProperties, PropsWithChildren } from "react";

export interface DiffLayoutProps extends PropsWithChildren {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
}

export const DiffLayout = ({ children, width = "100%", height = "100%" }: DiffLayoutProps) => {
    return (
        <section className="flex" style={{ width, height }}>
            {children}
        </section>
    );
};
