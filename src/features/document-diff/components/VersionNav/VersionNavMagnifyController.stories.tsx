import { VersionNavMagnifyController } from "@/features/document-diff/components/VersionNav/VersionNavMagnifyController";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof VersionNavMagnifyController> = {
    component: VersionNavMagnifyController,
};

export default meta;
type Story = StoryObj<typeof VersionNavMagnifyController>;

export const Default: Story = {
    args: {},
};
