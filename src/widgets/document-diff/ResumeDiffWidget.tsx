import { Fragment } from "react/jsx-runtime";

import {
    VersionNav,
    VersionNavItem,
    VersionNavMagnifyController,
} from "@/features/document-diff/components/VersionNav";

export const ResumeDiffWidget = () => {
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
            이력서 비교!
        </Fragment>
    );
};
