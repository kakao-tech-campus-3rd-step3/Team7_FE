//새 포트폴리오 페이지
import { useNavigate } from "react-router";

import { DocumentNewForm } from "@/entities/document/components/DocumentNewForm";

export default function NewPortfolioPage() {
    const navigate = useNavigate();

    return (
        <main className="mx-auto w-full max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <header className="mb-2 flex items-center gap-2">
                <button
                    type="button"
                    aria-label="뒤로가기"
                    onClick={() => navigate(-1)}
                    className="rounded-md px-2 py-1 text-lg text-gray-700 hover:bg-gray-100"
                >
                    ←
                </button>
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">새 포트폴리오 만들기</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        제목과 파일 업로드만 우선 제공합니다.
                    </p>
                </div>
            </header>

            <DocumentNewForm titleLabel="버전 제목" submitText="새 버전 저장" />
        </main>
    );
}
