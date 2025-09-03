import { Folder, UserRoundPen, Clock3, UserRound } from "lucide-react";

import {
    DashboardHeaderContainer,
    DashboardHeaderCard,
} from "@/features/dashboard/components/DashboardHeader";

export default function MenteeDashboardPage() {
    return (
        <div className="px-6 py-6">
            <h1 className="text-xl font-semibold text-foreground">취업 트래커 대시보드</h1>
            <h2 className="mt-1 text-[14.68px] leading-[22px] text-[#485563] font-normal">
                모든 취업 활동을 한눈에 관리하세요
            </h2>

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
        </div>
    );
}
