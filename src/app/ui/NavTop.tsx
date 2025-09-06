import logo from "@/app/assets/logo.svg";

import { Button } from "@/shared/ui/button";

export const NavTop = () => {
    return (
        <nav className="w-full h-[64px] shadow-xs">
            <ul className="w-full max-w-[1200px] mx-auto h-full px-4 flex items-center justify-between">
                <li>
                    <img src={logo} alt="CareerFit 커리어핏" />
                </li>
                <li>
                    <Button>로그인</Button>
                </li>
            </ul>
        </nav>
    );
};
