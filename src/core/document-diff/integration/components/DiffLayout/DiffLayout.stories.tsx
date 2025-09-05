import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DiffLayout> = {
    component: DiffLayout,
};

export default meta;
type Story = StoryObj<typeof DiffLayout>;

export const Default: Story = {
    args: {},
    render: () => {
        return (
            <DiffLayout width="100%" height="500px">
                <article className="w-full grid place-items-center bg-red-400/40">Before</article>
                <article className="w-full grid place-items-center bg-green-400/40">After</article>
            </DiffLayout>
        );
    },
};
