import type { PropsWithChildren } from "react";

export interface VersionNavProps extends PropsWithChildren {}

export const VersionNav = ({ children }: VersionNavProps) => {
    return <ul className="w-full flex list-none ">{children}</ul>;
};
