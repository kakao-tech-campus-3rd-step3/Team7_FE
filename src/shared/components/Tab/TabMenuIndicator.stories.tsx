import { TabMenuIndicator } from "@/shared/components/Tab/TabMenuIndicator";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TabMenuIndicator> = {
    component: TabMenuIndicator,
};

export default meta;
type Story = StoryObj<typeof TabMenuIndicator>;

export const Default: Story = {
    args: {
        value: 1,
    },
};
