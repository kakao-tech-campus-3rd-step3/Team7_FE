import { useParams } from "react-router";

import { ApplicationsSummaryCard } from "@/entities/applications/components/ApplicationsSummary/ApplicationsSummaryCard";

import { useGetApplicationMetadata } from "@/features/applications/services/getApplicationMetadata";

export const ApplicationMetadataContainer = () => {
    const { applicationId } = useParams<{ applicationId: string }>();
    const { data } = useGetApplicationMetadata(Number(applicationId));

    return (
        <ApplicationsSummaryCard
            companyName={data.companyName}
            applyPosition={data.applyPosition}
            location={data.location}
            jobType={data.employmentType}
            field={data.careerRequirement.toString()}
            progress={0}
            jobPostingUrl={data.url}
        />
    );
};
