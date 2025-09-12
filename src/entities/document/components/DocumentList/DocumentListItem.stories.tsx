import { DocumentListItem } from "./DocumentListItem";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof DocumentListItem> = {
    component: DocumentListItem,
};

export default meta;
type Story = StoryObj<typeof DocumentListItem>;

export const Default: Story = {
    args: {
        onViewVersion: fn(),
        onDeleteVersion: fn(),

        id: "1",
        title: "v1.2",
        description: "최종본",
        date: "2024.01.20",
    },
};
