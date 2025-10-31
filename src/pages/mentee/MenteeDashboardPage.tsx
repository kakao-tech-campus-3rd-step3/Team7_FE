import { useState, useMemo, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Folder, UserRoundPen, Clock3, UserRound } from "lucide-react";

import { NewApplicationButton, NewApplicationModal } from "@/features/applications";
import {
    useBoardState,
    sectionMock,
    SECTION_ORDER,
    type Section,
    type ApplyCard,
    MenteeDashboardListContainer,
    MenteeDashboardList,
    MenteeDashboardKanban,
    type MenteeDashboardListItemData,
} from "@/features/mentee-dashboard";
import {
    DashboardViewToggle,
    type DashboardViewMode,
} from "@/features/mentee-dashboard/components/ViewToggle/DashboardViewToggle";

import { calcDday } from "@/shared/lib/calcDday";

import { DashboardHeaderCard, DashboardHeaderContainer } from "@/widgets/dashboard-header";

//TODO : 기업 이미지 불러오기
const PlaceholderLogo: React.ReactNode = <div className="h-5 w-5 rounded-sm bg-zinc-200/80" />;

export default function MenteeDashboardPage() {
    const { board, setBoard, moveTo } = useBoardState(sectionMock);
    const [openCreate, setOpenCreate] = useState(false);

    const [view, setView] = useState<DashboardViewMode>("kanban");

    const totalApplications = useMemo(
        () => Object.values(board).reduce((sum, sectionCards) => sum + sectionCards.length, 0),
        [board],
    );
    const writing = board.writing.length;
    const interview = board.interview.length;

    const handleCreate = useCallback(
        (form: {
            companyName: string;
            applyPosition: string;
            deadline: string;
            location: string;
            employmentType: string;
            careerRequirement: number;
            url: string;
            targetSection?: Section;
        }) => {
            const target: Section = form.targetSection ?? "planned";
            const dday = calcDday(form.deadline);

            const newCard: ApplyCard = {
                id: `c${Date.now()}`,
                icon: undefined,
                company: form.companyName,
                position: form.applyPosition,
                dday,
            };

            setBoard((previousBoard) => {
                const nextBoard = { ...previousBoard };
                nextBoard[target] = [...nextBoard[target], newCard];
                return nextBoard;
            });
        },
        [setBoard],
    );

    const listItems: MenteeDashboardListItemData[] = useMemo(
        () =>
            SECTION_ORDER.flatMap((sectionKey) => board[sectionKey]).map((card) => ({
                id: card.id,
                icon: card.icon ?? PlaceholderLogo,
                company: card.company,
                position: card.position,
                dday: card.dday,
            })),
        [board],
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="px-6 py-6">
                <header className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-foreground">
                            취업 트래커 대시보드
                        </h1>
                        <p className="mt-1 text-sm leading-[22px] text-[#485563] font-normal">
                            모든 취업 활동을 한눈에 관리하세요
                        </p>
                    </div>
                    <NewApplicationButton onClick={() => setOpenCreate(true)} />
                </header>

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

                <header className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg leading-7 font-semibold text-slate-900">
                            지원 현황
                        </h2>
                        <DashboardViewToggle value={view} onValueChange={setView} />
                    </div>
                </header>

                {view === "kanban" && (
                    <MenteeDashboardKanban board={board} moveTo={moveTo} icon={PlaceholderLogo} />
                )}

                {view === "list" && (
                    <MenteeDashboardListContainer>
                        <MenteeDashboardList items={listItems} />
                    </MenteeDashboardListContainer>
                )}
            </main>

            <NewApplicationModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreate}
            />
        </DndProvider>
    );
}
