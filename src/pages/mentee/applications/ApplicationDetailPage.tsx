import { Suspense } from "react";

import { ApplicationMetadataContainer } from "@/features/applications/containers/ApplicationMetadataContainer";

import { ApplicationsDocumentsWidget } from "@/widgets/applications/ApplicationsDocumentsWidget";

export default function ApplicationDetailPage() {
    return (
        <div className="p-6 space-y-6">
            <Suspense>
                <ApplicationMetadataContainer />
            </Suspense>

            <ApplicationsDocumentsWidget />
        </div>
    );
}
