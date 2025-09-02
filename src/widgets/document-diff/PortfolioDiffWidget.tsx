import { Fragment } from "react/jsx-runtime";

import {
    VersionNav,
    VersionNavItem,
    VersionNavMagnifyController,
} from "@/features/document-diff/components/VersionNav";

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
            포트폴리오 비교!
        </Fragment>
    );
};
