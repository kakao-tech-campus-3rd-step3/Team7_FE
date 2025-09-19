import { DocumentNewForm } from "./DocumentNewForm";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

const meta: Meta<typeof DocumentNewForm> = {
    title: "Entities/Document/DocumentNewForm",
    component: DocumentNewForm,
    args: {
        titleLabel: "버전 제목",
        submitText: "새 버전 저장",
    },
};
export default meta;
type Story = StoryObj<typeof DocumentNewForm>;

export const Default: Story = {};

export const WithFiles: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const fileInput: HTMLInputElement | null =
            canvasElement.querySelector('input[type="file"]');
        if (!fileInput) return;

        const file1 = new File(["dummy pdf"], "portfolio.pdf", {
            type: "application/pdf",
            lastModified: 1710000000000,
        });
        const file2 = new File(["dummy doc"], "resume.docx", {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            lastModified: 1710001000000,
        });

        await userEvent.upload(fileInput, [file1, file2]);

        const titleInput = canvas.getByLabelText("버전 제목");
        await userEvent.type(titleInput, "업로드 테스트 버전");
    },
};
