import { DashboardApplyCard } from "./DashboardApplyCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const PlaceholderLogo: React.ReactNode = <div className="h-5 w-5 rounded-sm bg-zinc-200/80" />;

const meta: Meta<typeof DashboardApplyCard> = {
    component: DashboardApplyCard,
};

export default meta;
type Story = StoryObj<typeof DashboardApplyCard>;

export const Default: Story = {
    args: {
        icon: PlaceholderLogo,
        company: "LG CNS",
        position: "클라우드 엔지니어",
        dday: "D-14",
    },
};
