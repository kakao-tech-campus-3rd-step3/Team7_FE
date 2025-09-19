import { Link, useLocation } from "react-router";

import { cn } from "@/shared/lib/utils";

export interface NavAsideProps {
    navAsideMenus: Array<NavAsideItemProps>;
}

export const NavAside = ({ navAsideMenus }: NavAsideProps) => {
    return (
        <aside className="w-[210px] shadow-xs h-full flex-shrink-0 p-4 border-r border-gray-200">
            <nav className="w-full flex flex-col gap-3">
                {navAsideMenus.map((menu) => {
                    return <NavAsideItem key={menu.to} {...menu} />;
                })}
            </nav>
        </aside>
    );
};

///////////////////////////////////////////////////////////

export interface NavAsideItemProps {
    label: string;
    to: string;
    icon: React.ReactNode;
}

export const NavAsideItem = ({ icon, label, to }: NavAsideItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className={cn("list-none p-2 rounded-sm", isActive && "bg-[#EFF6FF] text-blue-500")}>
            <Link to={to} className="flex gap-3 items-center">
                <div>{icon}</div>
                <p>{label}</p>
            </Link>
        </li>
    );
};
