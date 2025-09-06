import { Outlet } from "react-router";

import { Card } from "@/shared/ui/card";

export const RegisterLayout = () => {
    return (
        <main className="bg-[#F9FAFB] p-4 min-h-screen">
            <Card className="w-[640px] mx-auto p-4 rounded-sm">
                <Outlet />
            </Card>
        </main>
    );
};
