import { Fragment } from "react/jsx-runtime";

import {
    VersionNav,
    VersionNavItem,
    VersionNavMagnifyController,
} from "@/features/document-diff/components/VersionNav";

import { PdfDiffViewer } from "@/core/document-diff/integration/components/DiffViewer/PdfDiffViewer";

export const PortfolioDiffWidget = () => {
    return (
        <Fragment>
            <VersionNav>
                <VersionNavItem
                    variant="original"
                    label="원본"
                    controller={<VersionNavMagnifyController />}
                />
                <VersionNavItem
                    variant="modified"
                    label="수정본"
                    controller={<VersionNavMagnifyController />}
                />
            </VersionNav>

            <PdfDiffViewer before="/mocks/v1-sample.pdf" after="/mocks/v2-sample.pdf" />
        </Fragment>
    );
};
