import type {
    CoverletterQnaItem,
    CoverletterVersion,
} from "@/widgets/document-diff/CoverletterDiffWidget";

export const mockOriginalItems: CoverletterQnaItem[] = [
    {
        question: "지원동기 및 입사 후 포부",
        answer:
            "제가 Career-Fit에 지원한 이유는 사용자 문제를 데이터로 확인하고 개선하는 일이 즐겁기 때문입니다. " +
            "최근 교내 프로젝트에서 인터뷰와 로그 분석을 통해 전환 저하 원인을 찾고, 온보딩 문구를 다듬어 전환율을 12% 개선했습니다. " +
            "입사 후에는 실험-학습 루프를 정착시키고, 작은 배포를 자주 하는 문화를 만들고 싶습니다.",
    },
    {
        question: "직무 관련 역량",
        answer:
            "React와 TypeScript 기반으로 대시보드와 Form을 구현했고, 상태 관리는 Zustand를 사용했습니다. " +
            "접근성 점검을 통해 키보드 내비게이션과 명도 대비를 개선했습니다.",
    },
];

export const mockModifiedItems: CoverletterQnaItem[] = [
    {
        question: "지원동기 및 입사 후 포부",
        answer:
            "제가 Career-Fit에 지원한 이유는 사용자 문제를 데이터로 확인하고 개선하는 일이 즐겁기 때문입니다. " +
            "최근 교내 프로젝트에서 인터뷰와 로그 분석으로 전환 저하 원인을 규명하고, 온보딩 문구와 흐름을 다듬어 전환율을 15% 개선했습니다. " +
            "특히 실험 결과를 팀과 공유해 재현 가능한 개선 프로세스를 만들었습니다.",
    },
    {
        question: "직무 관련 역량",
        answer:
            "React와 TypeScript 기반으로 대시보드와 Form을 구현했고, 상태 관리는 Zustand와 React Query를 병행했습니다. " +
            "접근성 점검을 통해 키보드 내비게이션과 명도 대비를 개선했고, Vitest 기반 단위 테스트로 회귀를 방지했습니다.",
    },
    {
        question: "프로젝트 성과(신규)",
        answer:
            "로그 기반 퍼널을 정의하고 병목 단계에서의 이탈 원인을 표준화된 체크리스트로 관리했습니다. " +
            "그 결과 릴리스 후 첫 2주간 활성 사용자 잔존율이 8%p 상승했습니다.",
    },
];

export const mockVersions: CoverletterVersion[] = [
    { id: "v1", label: "v1", items: mockOriginalItems },
    { id: "v2", label: "v2", items: mockModifiedItems },
];
