import { NewApplicationButton } from "./NewApplicationButton";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NewApplicationButton> = {
    component: NewApplicationButton,
};

export default meta;
type Story = StoryObj<typeof NewApplicationButton>;

export const Default: Story = {
    args: { label: "신규 지원 추가" },
};
