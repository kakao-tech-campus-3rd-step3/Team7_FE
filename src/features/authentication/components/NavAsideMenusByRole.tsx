import { navAsideMenusMentee, navAsideMenusMentor } from "@/app/config/nav";
import { NavAside } from "@/app/ui/NavAside";

import { Role, useAuthStore } from "@/features/authentication/store/authStore";

export const NavAsideMenusByRole = () => {
    const role = useAuthStore((state) => state.role);

    if (role === Role.MENTOR) {
        return <NavAside navAsideMenus={navAsideMenusMentor} />;
    } else if (role === Role.MENTEE) {
        return <NavAside navAsideMenus={navAsideMenusMentee} />;
    }
    return null;
};
