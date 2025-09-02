import { VersionNavItem } from "@/features/document-diff/components/VersionNav/VersionNavItem";
import { VersionNavMagnifyController } from "@/features/document-diff/components/VersionNav/VersionNavMagnifyController";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof VersionNavItem> = {
    component: VersionNavItem,
};

export default meta;
type Story = StoryObj<typeof VersionNavItem>;

export const Default: Story = {
    args: {
        label: "Original Version (Default)",
    },
};

export const Original: Story = {
    args: {
        variant: "original",
        label: "Original Version (Original)",
    },
};

export const Modified: Story = {
    args: {
        variant: "modified",
        label: "Modified Version (Modified)",
    },
};

export const WithMagnifier: Story = {
    args: {
        label: "With Magnifier",
        controller: <VersionNavMagnifyController />,
    },
};
