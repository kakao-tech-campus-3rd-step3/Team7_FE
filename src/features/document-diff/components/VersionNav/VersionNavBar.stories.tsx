import { VersionNav } from "@/features/document-diff/components/VersionNav/VersionNavBar";
import { VersionNavItem } from "@/features/document-diff/components/VersionNav/VersionNavItem";
import { VersionNavMagnifyController } from "@/features/document-diff/components/VersionNav/VersionNavMagnifyController";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof VersionNav> = {
    component: VersionNav,
};

export default meta;
type Story = StoryObj<typeof VersionNav>;

export const Default: Story = {
    args: {},
    render: () => {
        return (
            <VersionNav>
                <VersionNavItem
                    variant="original"
                    label="원본"
                    controller={<VersionNavMagnifyController />}
                />
                <VersionNavItem
                    variant="modified"
                    label="수정본"
                    controller={<VersionNavMagnifyController />}
                />
            </VersionNav>
        );
    },
};
