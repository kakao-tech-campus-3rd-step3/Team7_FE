// File: src/entities/document/components/DocumentList.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocumentList } from "./DocumentList";

const meta: Meta<typeof DocumentList> = {
  title: "Entities/Document/DocumentList",
  component: DocumentList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "문서(이력서/자기소개서/포트폴리오) 버전 리스트 컴포넌트. 폴더 아이콘 섹션 헤더 + 파일 아이콘 버전 아이템 + 우측 액션(보기/삭제) 구성을 제공합니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6 max-w-3xl">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DocumentList>;

export const WithResumes: Story = {
  args: {
    title: "이력서",
    versions: [
      { id: "1", title: "v1.2", description: "최종본", date: "2024.01.20" },
      { id: "2", title: "v1.1", description: "1차 피드백 반영", date: "2024.01.18" },
      { id: "3", title: "v1.0", description: "초안", date: "2024.01.15" },
    ],
    onCreateVersion: () => console.log("새 버전 만들기 클릭"),
    onViewVersion: (id) => console.log("보기 클릭:", id),
    onDeleteVersion: (id) => console.log("삭제 클릭:", id),
  },
};

export const Empty: Story = {
  args: {
    title: "이력서",
    versions: [],
    onCreateVersion: () => console.log("이력서 새 버전 만들기"),
  },
};

export const ManyItems: Story = {
  args: {
    title: "이력서",
    versions: Array.from({ length: 10 }).map((_, i) => ({
      id: String(i + 1),
      title: `v1.${i}`,
      description: i % 2 ? "리뷰 반영" : "작업본",
      date: `2024.02.${String(i + 1).padStart(2, "0")}`,
    })),
    onCreateVersion: () => console.log("이력서 새 버전 만들기"),
    onViewVersion: (id) => console.log("보기 클릭:", id),
    onDeleteVersion: (id) => console.log("삭제 클릭:", id),
  },
};

export const LongText: Story = {
  args: {
    title: "이력서",
    versions: [
      {
        id: "1",
        title: "v1.2-긴-라벨-예시-긴-라벨-예시",
        description:
          "제목/프로젝트/스킬 상세가 길어지는 경우를 가정한 설명 텍스트 예시입니다. 가독성을 유지하는지 확인하세요.",
        date: "2024.01.20",
      },
    ],
    onCreateVersion: () => console.log("새 버전 만들기 클릭"),
    onViewVersion: (id) => console.log("보기 클릭:", id),
    onDeleteVersion: (id) => console.log("삭제 클릭:", id),
  },
};
