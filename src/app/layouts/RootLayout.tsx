import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { NavTop } from "@/app/ui/NavTop";

export interface RootLayoutProps {
    navAside: React.ReactNode;
}

export const RootLayout = ({ navAside }: RootLayoutProps) => {
    return (
        <Fragment>
            <header>
                <NavTop />
            </header>

            <main className="flex" style={{ height: "calc(100vh - 64px)" }}>
                {navAside}
                <section className="w-full bg-[#F9FAFB]">
                    <Outlet />
                </section>
            </main>
        </Fragment>
    );
};
