import { calcDday } from "@/shared/lib/calcDday";

import type { Section, ApplyCard } from "../models/types";
import type { GetApplicationByIdResponse } from "./getApplicationById";
import type { ApplicationItem } from "./getApplications";

export type ApplicationStatus = "PREPARING" | "WRITING" | "APPLIED" | "INTERVIEWING" | "HIRED";

export function mapApplicationStatusToSection(
    status: Exclude<ApplicationStatus, "HIRED">,
): Section {
    const statusMap: Record<Exclude<ApplicationStatus, "HIRED">, Section> = {
        PREPARING: "planned",
        WRITING: "writing",
        APPLIED: "submitted",
        INTERVIEWING: "interview",
    };
    return statusMap[status];
}

export function mapSectionToApplicationStatus(section: Section): ApplicationStatus {
    const sectionMap: Record<Section, ApplicationStatus> = {
        planned: "PREPARING",
        writing: "WRITING",
        submitted: "APPLIED",
        interview: "INTERVIEWING",
    };
    return sectionMap[section];
}

export function mapApplicationItemToApplyCard(item: ApplicationItem): ApplyCard {
    const dday = calcDday(item.deadline);

    return {
        id: item.applicationId.toString(),
        company: item.companyName,
        position: item.applyPosition,
        dday,
        deadline: item.deadline,
        icon: undefined,
    };
}

export function mapApplicationDetailToApplyCard(detail: GetApplicationByIdResponse): ApplyCard {
    const dday = calcDday(detail.deadline);

    return {
        id: detail.applicationId.toString(),
        company: detail.companyName,
        position: detail.applyPosition,
        dday,
        deadline: detail.deadline,
        location: detail.location,
        employmentType: detail.employmentType,
        careerRequirement: detail.careerRequirement,
        url: detail.url,
        icon: undefined,
    };
}
