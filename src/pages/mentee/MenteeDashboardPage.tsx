import { Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { NewApplicationButton } from "@/features/applications";
import {
    useMenteeDashboard,
    MenteeDashboardListContainer,
    MenteeDashboardList,
    MenteeDashboardKanban,
    DashboardHeaderSection,
    ApplicationsModals,
    DashboardViewToggle,
} from "@/features/mentee-dashboard";

import { PageLoading } from "@/shared/ui/page-loading";
import { QueryErrorBoundary } from "@/shared/ui/query-error-boundary";

//TODO : 기업 이미지 불러오기
const PlaceholderLogo: React.ReactNode = <div className="h-5 w-5 rounded-sm bg-zinc-200/80" />;

const MenteeDashboardContent = () => {
    const {
        board,
        view,
        stats,
        listItems,
        openCreate,
        openEdit,
        openDelete,
        editModalInitialData,
        setView,
        moveTo,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleEditClick,
        handleDeleteClick,
        openCreateModal,
        closeCreateModal,
        closeEditModal,
        closeDeleteModal,
    } = useMenteeDashboard();

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
                    <NewApplicationButton onClick={openCreateModal} />
                </header>

                <DashboardHeaderSection
                    totalApplications={stats.totalApplications}
                    writing={stats.writing}
                    interview={stats.interview}
                />

                <header className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg leading-7 font-semibold text-slate-900">
                            지원 현황
                        </h2>
                        <DashboardViewToggle value={view} onValueChange={setView} />
                    </div>
                </header>

                {view === "kanban" && (
                    <MenteeDashboardKanban
                        board={board}
                        moveTo={moveTo}
                        icon={PlaceholderLogo}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                )}

                {view === "list" && (
                    <MenteeDashboardListContainer>
                        <MenteeDashboardList
                            items={listItems}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    </MenteeDashboardListContainer>
                )}
            </main>

            <ApplicationsModals
                openCreate={openCreate}
                onCloseCreate={closeCreateModal}
                onCreate={handleCreate}
                openEdit={openEdit}
                onCloseEdit={closeEditModal}
                onUpdate={handleUpdate}
                editInitialData={editModalInitialData}
                openDelete={openDelete}
                onCloseDelete={closeDeleteModal}
                onConfirmDelete={handleDelete}
            />
        </DndProvider>
    );
};

export default function MenteeDashboardPage() {
    return (
        <QueryErrorBoundary>
            <Suspense fallback={<PageLoading description="지원 현황을 불러오고 있습니다." />}>
                <MenteeDashboardContent />
            </Suspense>
        </QueryErrorBoundary>
    );
}
