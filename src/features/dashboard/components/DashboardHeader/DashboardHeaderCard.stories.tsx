import { DashboardHeaderCard } from "@/features/dashboard/components/DashboardHeader/DashboardHeaderCard";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DashboardHeaderCard> = {
    component: DashboardHeaderCard,
};

export default meta;
type Story = StoryObj<typeof DashboardHeaderCard>;

export const Default: Story = {
    args: {},
};
