import { TabNavBar } from "@/shared/components/Tab/TabNavBar";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TabNavBar> = {
    component: TabNavBar,
};

export default meta;
type Story = StoryObj<typeof TabNavBar>;

export const Default: Story = {
    args: {},
    render: () => {
        return <TabNavBar></TabNavBar>;
    },
};
