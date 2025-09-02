import { BookText } from "lucide-react";

import { Tab } from "@/shared/components/Tab/Tab";
import { TabMenuIndicator } from "@/shared/components/Tab/TabMenuIndicator";
import { TabNavItem } from "@/shared/components/Tab/TabNavItem";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TabNavItem> = {
    component: TabNavItem,
};

export default meta;
type Story = StoryObj<typeof TabNavItem>;

export const Active: Story = {
    args: {
        icon: <BookText size={16} />,
        label: "메뉴",
        indicator: <TabMenuIndicator value={1} />,
    },
    render: (args) => {
        return (
            <Tab defaultActiveTab="메뉴">
                <TabNavItem {...args} />
            </Tab>
        );
    },
};

export const InActive: Story = {
    args: {
        icon: <BookText size={16} />,
        label: "메뉴",
        indicator: <TabMenuIndicator value={1} />,
    },
    render: (args) => {
        return (
            <Tab defaultActiveTab="다른메뉴">
                <TabNavItem {...args} />
            </Tab>
        );
    },
};

export const NoIndicatorActive: Story = {
    args: {
        icon: <BookText size={16} />,
        label: "메뉴",
        indicator: null,
    },
    render: (args) => {
        return (
            <Tab defaultActiveTab="메뉴">
                <TabNavItem {...args} />
            </Tab>
        );
    },
};

export const NoIndicatorInActive: Story = {
    args: {
        icon: <BookText size={16} />,
        label: "메뉴",
        indicator: null,
    },
    render: (args) => {
        return (
            <Tab defaultActiveTab="다른메뉴">
                <TabNavItem {...args} />
            </Tab>
        );
    },
};
