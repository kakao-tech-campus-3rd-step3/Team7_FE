import { useState } from "react";

import { http, HttpResponse } from "msw";

import { CoverLetterNewForm } from "./CoverLetterNewForm";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const withReactQuery: Decorator = (Story) => {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { retry: false, refetchOnWindowFocus: false },
                },
            }),
    );
    return (
        <QueryClientProvider client={client}>
            <Story />
        </QueryClientProvider>
    );
};

const meta: Meta<typeof CoverLetterNewForm> = {
    title: "Entities/Document/CoverLetterNewForm",
    component: CoverLetterNewForm,
    decorators: [withReactQuery],
    args: {
        applicationId: "demo-app",
        titleLabel: "버전 제목",
        submitText: "새 자기소개서 저장",
        versionItems: [
            {
                id: undefined,
                title: "빈 문서에서 시작",
                description: "처음부터 새로운 자기소개서를 작성합니다",
            },
            { id: "v12", title: "v1.2 - 최종본", date: "2024.01.20" },
            { id: "v11", title: "v1.1 - 1차 피드백 반영", date: "2024.01.18" },
            { id: "v10", title: "v1.0 - 초안", date: "2024.01.15" },
        ],
    },
};
export default meta;

type Story = StoryObj<typeof CoverLetterNewForm>;

export const Default: Story = {};

export const PrefilledFromAPI: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(
                    "/api/applications/:applicationId/coverletters/:versionId",
                    ({ params }) => {
                        const { versionId } = params as {
                            applicationId: string;
                            versionId: string;
                        };
                        if (versionId === "v12") {
                            return HttpResponse.json({
                                data: {
                                    title: "라인 신입 백엔드 개발자 자기소개서2",
                                    coverLetterItems: [
                                        {
                                            question: "지원 동기에 대해 서술하시오.",
                                            answer: "라인의 기술력에 매료되어...",
                                            answerLimit: 1000,
                                        },
                                        {
                                            question: "협업 경험에 대해 서술하시오.",
                                            answer: "팀 프로젝트에서 Git을 활용하여...",
                                            answerLimit: 1000,
                                        },
                                    ],
                                },
                            });
                        }
                        return HttpResponse.json({
                            data: { title: "빈 문서", coverLetterItems: [] },
                        });
                    },
                ),
            ],
        },
    },

    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(await canvas.findByText("v1.2 - 최종본"));

        await canvas.findByDisplayValue("지원 동기에 대해 서술하시오.");
        await canvas.findByDisplayValue("협업 경험에 대해 서술하시오.");
        await canvas.findByDisplayValue("라인의 기술력에 매료되어...");
        await canvas.findByDisplayValue("팀 프로젝트에서 Git을 활용하여...");
    },
};

export const ManyQuestions: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const addBtn = await canvas.findByRole("button", { name: /문항 추가하기/i });
        await userEvent.click(addBtn);
        await userEvent.click(addBtn);
        await userEvent.click(addBtn);
        await userEvent.click(addBtn);

        await waitFor(async () => {
            await expect(canvas.getAllByLabelText("문항 제목")).toHaveLength(5);
            await expect(canvas.getAllByRole("textbox", { name: /번 문항 내용/ })).toHaveLength(5);
        });

        const titleInputs = canvas.getAllByLabelText("문항 제목");
        const textareas = canvas.getAllByRole("textbox", { name: /번 문항 내용/ });

        for (let i = 0; i < 5; i++) {
            await userEvent.clear(titleInputs[i]);
            await userEvent.type(titleInputs[i], `문항 ${i + 1} 제목`);
            if (i % 2 === 0) await userEvent.type(textareas[i], `문항 ${i + 1}의 예시 답변 ...`);
        }

        await canvas.findByDisplayValue("문항 1 제목");
        await canvas.findByDisplayValue("문항 3 제목");
        await canvas.findByDisplayValue("문항 5 제목");
        await canvas.findByDisplayValue("문항 1의 예시 답변 ...");
    },
};
