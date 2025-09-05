import { ApplicationsSummaryCard } from "@/entities/applications/components/ApplicationsSummary/ApplicationsSummaryCard";

import { ApplicationsDocumentsWidget } from "@/widgets/applications/ApplicationsDocumentsWidget";

export default function ApplicationDetailPage() {
    return (
        <div className="p-6 space-y-6">
            <ApplicationsSummaryCard
                companyLogo="/assets/samsung.png"
                companyName="삼성전자"
                applyPosition="DX부문 소프트웨어 개발"
                appliedDate="2024-01-15"
                location="서울"
                jobType="정규직"
                field="신입"
                progress={60}
            />

            <ApplicationsDocumentsWidget />
        </div>
    );
}
