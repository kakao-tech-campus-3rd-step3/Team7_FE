import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DiffLayout> = {
    component: DiffLayout,
    args: {
        className: "w-full h-[500px]",
        gapXClass: "gap-x-6",
        showDivider: true,
        center: true,
        leftAccentClass: "border-l-4 border-blue-500",
        rightAccentClass: "border-l-4 border-emerald-500",
    },
};

export default meta;
type Story = StoryObj<typeof DiffLayout>;

export const Default: Story = {
    render: (args) => (
        <DiffLayout {...args}>
            <article className="w-full grid place-items-center bg-red-400/20 h-[460px]">
                Before
            </article>
            <article className="w-full grid place-items-center bg-green-400/20 h-[460px]">
                After
            </article>
        </DiffLayout>
    ),
};
