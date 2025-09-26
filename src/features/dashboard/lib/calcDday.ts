export function calcDday(date: string) {
    if (!date) return "D-";

    const now = new Date(`${date}T23:59:59`);
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffDay = now.getTime() - todayStart.getTime();
    const deadline = Math.ceil(diffDay / (1000 * 60 * 60 * 24));

    if (deadline === 0) return "D-Day";
    if (deadline > 0) return `D-${deadline}`;
    return `D+${Math.abs(deadline)}`;
}
