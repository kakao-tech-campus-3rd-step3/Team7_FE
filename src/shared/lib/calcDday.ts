import { parseISO, endOfDay, differenceInCalendarDays, isValid } from "date-fns";

export function calcDday(date: string) {
    if (!date) return "D-";

    const parsed = parseISO(date);
    if (!isValid(parsed)) return "D-";

    const end = endOfDay(parsed);
    const now = new Date();

    const deadline = differenceInCalendarDays(end, now);
    if (deadline === 0) return "D-Day";
    if (deadline > 0) return `D-${deadline}`;
    return `D+${Math.abs(deadline)}`;
}
