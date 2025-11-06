import { Folder } from "lucide-react";

import { DashboardHeaderCard } from "./DashboardHeaderCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DashboardHeaderCard> = {
    component: DashboardHeaderCard,
};

export default meta;
type Story = StoryObj<typeof DashboardHeaderCard>;

export const Default: Story = {
    args: {
        title: "전체 지원 패키지",
        value: 12,
        description: "+2 이번 주",
        icon: <Folder className="h-5 w-5 text-blue-600" strokeWidth={2} />,
        iconBg: "bg-blue-50",
    },
};
