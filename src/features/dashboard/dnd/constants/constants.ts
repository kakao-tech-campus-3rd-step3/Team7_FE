import type { Section } from "@/features/dashboard/dnd/types";

export const sectionState: Record<Section, { title: string; wrapperClassName: string }> = {
    planned: { title: "지원 예정", wrapperClassName: "bg-zinc-50" },
    writing: { title: "서류 작성 중", wrapperClassName: "bg-yellow-50" },
    submitted: { title: "제출 완료", wrapperClassName: "bg-sky-50" },
    interview: { title: "면접 진행", wrapperClassName: "bg-green-50" },
};
