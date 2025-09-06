import { LayoutDashboard, Settings, UserRoundSearch } from "lucide-react";

import type { NavAsideItemProps } from "@/app/ui/NavAside";

export const navAsideMenusMentee: Array<NavAsideItemProps> = [
    {
        label: "대시보드",
        to: "/mentee/dashboard",
        icon: <LayoutDashboard size={14} />,
    },
    {
        label: "멘토찾기",
        to: "/mentee/search",
        icon: <UserRoundSearch size={14} />,
    },
    {
        label: "계정설정",
        to: "/mentee/settings",
        icon: <Settings size={14} />,
    },
];
