import { DashboardApplyCard } from "./DashboardApplyCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DashboardApplyCard> = {
    component: DashboardApplyCard,
};

export default meta;
type Story = StoryObj<typeof DashboardApplyCard>;

export const Default: Story = {
    args: {
        company: "LG CNS",
        position: "클라우드 엔지니어",
        dday: "D-14",
    },
};
