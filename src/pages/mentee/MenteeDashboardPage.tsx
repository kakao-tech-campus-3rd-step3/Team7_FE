import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Folder, UserRoundPen, Clock3, UserRound } from "lucide-react";

import { NewApplicationButton } from "@/features/applications/components/applications-create";
import {
    DashboardApplyContainer,
    DndApplyCard,
    DndApplySection,
    DashboardHeaderContainer,
    DashboardHeaderCard,
    useBoardState,
    sectionState,
    sectionMock,
    SECTION_ORDER,
} from "@/features/dashboard";

//TODO : 기업 이미지 불러오기
const PlaceholderLogo: React.ReactNode = <div className="h-5 w-5 rounded-sm bg-zinc-200/80" />;

export default function MenteeDashboardPage() {
    const { board, moveTo } = useBoardState(sectionMock);
    const totalApplications = Object.values(board).reduce(
        (sum, sectionCards) => sum + sectionCards.length,
        0,
    );
    const writing = board.writing.length;
    const interview = board.interview.length;

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="px-6 py-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground">
                            취업 트래커 대시보드
                        </h1>
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
                        value={totalApplications}
                        description="+2 이번 주"
                        icon={<Folder className="h-5 w-5 text-blue-600" strokeWidth={2} />}
                        iconBg="bg-blue-50"
                    />
                    <DashboardHeaderCard
                        title="진행 중인 멘토링"
                        value={writing}
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
                        value={interview}
                        description="+1 이번 주"
                        icon={<UserRound className="h-5 w-5 text-violet-600" strokeWidth={2} />}
                        iconBg="bg-violet-50"
                    />
                </DashboardHeaderContainer>

                <h3 className="mt-8 mb-3 text-lg leading-7 font-semibold text-slate-900">
                    지원 현황
                </h3>

                <DashboardApplyContainer>
                    {SECTION_ORDER.map((sectionKey, sectionIndex) => {
                        const section = sectionState[sectionKey];
                        const cards = board[sectionKey];
                        return (
                            <DndApplySection
                                key={sectionKey}
                                title={section.title}
                                value={cards.length}
                                wrapperClassName={section.wrapperClassName}
                                sectionKey={sectionKey}
                                sectionIndex={sectionIndex}
                                maxStep={2}
                                onCardDrop={(item) => moveTo(item, sectionKey)}
                            >
                                {cards.map((card, cardIndex) => (
                                    <DndApplyCard
                                        key={card.id}
                                        id={card.id}
                                        from={sectionKey}
                                        origin={cardIndex}
                                        icon={PlaceholderLogo}
                                        company={card.company}
                                        position={card.position}
                                        dday={card.dday}
                                    />
                                ))}
                            </DndApplySection>
                        );
                    })}
                </DashboardApplyContainer>
            </div>
        </DndProvider>
    );
}
