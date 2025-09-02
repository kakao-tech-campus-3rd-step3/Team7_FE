import type { PropsWithChildren } from "react";

export const TabNavBar = ({ children }: Partial<PropsWithChildren>) => {
    return (
        <nav className="h-fit w-full flex border-t border-b border-gray-200 bg-white">
            {children}
        </nav>
    );
};
