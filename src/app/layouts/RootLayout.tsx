import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { NavAside, type NavAsideProps } from "@/app/ui/NavAside";
import { NavTop } from "@/app/ui/NavTop";

export interface RootLayoutProps extends NavAsideProps {}

export const RootLayout = ({ navAsideMenus }: RootLayoutProps) => {
    return (
        <Fragment>
            <header>
                <NavTop />
            </header>

            <main className="flex" style={{ height: "calc(100vh - 64px)" }}>
                <NavAside navAsideMenus={navAsideMenus} />
                <section className="w-full bg-[#F9FAFB]">
                    <Outlet />
                </section>
            </main>
        </Fragment>
    );
};
