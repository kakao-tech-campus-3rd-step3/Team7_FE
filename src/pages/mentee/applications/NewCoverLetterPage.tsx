import { CoverLetterNewForm } from "@/entities/document/components/DocumentNewForm/CoverLetterNewForm";

export default function NewCoverLetterPage() {
    return (
        <main className="mx-auto w-full max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <CoverLetterNewForm
                titleLabel="버전 제목"
                submitText="새 자기소개서 저장"
                onSubmit={(payload) => {
                    console.log("자기소개서 저장 payload:", payload);
                }}
            />
        </main>
    );
}
