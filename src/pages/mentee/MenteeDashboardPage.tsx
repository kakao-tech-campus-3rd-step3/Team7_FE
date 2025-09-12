import { Folder, UserRoundPen, Clock3, UserRound } from "lucide-react";

import { NewApplicationButton } from "@/features/applications/components/applications-create";
import {
    DashboardApplyCard,
    DashboardApplyWrapper,
    DashboardApplyContainer,
} from "@/features/dashboard/components/DashboardApply";
import {
    DashboardHeaderContainer,
    DashboardHeaderCard,
} from "@/features/dashboard/components/DashboardHeader";

//TODO : 기업 이미지 불러오기
const PlaceholderLogo: React.ReactNode = <div className="h-5 w-5 rounded-sm bg-zinc-200/80" />;

export default function MenteeDashboardPage() {
    return (
        <div className="px-6 py-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-foreground">취업 트래커 대시보드</h1>
                    <h2 className="mt-1 text-sm leading-[22px] text-[#485563] font-normal">
                        모든 취업 활동을 한눈에 관리하세요
                    </h2>
                </div>
                <NewApplicationButton
                    onClick={() => {
                        //TODO: 나중에 모달 오픈 훅 연결 예정
                        alert("신규 지원 추가 클릭");
                    }}
                />
            </div>

            <DashboardHeaderContainer className="mt-4">
                <DashboardHeaderCard
                    title="전체 지원 패키지"
                    value={12}
                    description="+2 이번 주"
                    icon={<Folder className="h-5 w-5 text-blue-600" strokeWidth={2} />}
                    iconBg="bg-blue-50"
                />
                <DashboardHeaderCard
                    title="진행 중인 멘토링"
                    value={3}
                    description="+1 이번 주"
                    icon={<UserRoundPen className="h-5 w-5 text-emerald-600" strokeWidth={2} />}
                    iconBg="bg-emerald-50"
                />
                <DashboardHeaderCard
                    title="이번 주 마감"
                    value={2}
                    description=" - "
                    icon={<Clock3 className="h-5 w-5 text-orange-600" strokeWidth={2} />}
                    iconBg="bg-orange-50"
                />
                <DashboardHeaderCard
                    title="면접 대기"
                    value={1}
                    description="+1 이번 주"
                    icon={<UserRound className="h-5 w-5 text-violet-600" strokeWidth={2} />}
                    iconBg="bg-violet-50"
                />
            </DashboardHeaderContainer>

            <h3 className="mt-8 mb-3 text-lg leading-7 font-semibold text-slate-900">지원 현황</h3>

            <DashboardApplyContainer>
                <DashboardApplyWrapper title="지원 예정" value={1} wrapperClassName="bg-zinc-50">
                    <DashboardApplyCard
                        icon={PlaceholderLogo}
                        company="LG CNS"
                        position="클라우드 엔지니어"
                        dday="D-14"
                    />
                </DashboardApplyWrapper>

                <DashboardApplyWrapper
                    title="서류 작성 중"
                    value={1}
                    wrapperClassName="bg-yellow-50"
                >
                    <DashboardApplyCard
                        icon={PlaceholderLogo}
                        company="삼성전자"
                        position="DX부문 소프트웨어 개발"
                        dday="D-7"
                    />
                </DashboardApplyWrapper>

                <DashboardApplyWrapper title="제출 완료" value={1} wrapperClassName="bg-sky-50">
                    <DashboardApplyCard
                        icon={PlaceholderLogo}
                        company="네이버"
                        position="백엔드 개발자"
                        dday="D-3"
                    />
                </DashboardApplyWrapper>

                <DashboardApplyWrapper title="면접 진행" value={1} wrapperClassName="bg-green-50">
                    <DashboardApplyCard
                        icon={PlaceholderLogo}
                        company="카카오"
                        position="프론트엔드 개발자"
                        dday="D-21"
                    />
                </DashboardApplyWrapper>
            </DashboardApplyContainer>
        </div>
    );
}
