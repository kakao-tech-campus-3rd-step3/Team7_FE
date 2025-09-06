import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { NavTop } from "@/app/ui/NavTop";

export const NavTopLayout = () => {
    return (
        <Fragment>
            <header>
                <NavTop />
            </header>

            <Outlet />
        </Fragment>
    );
};
