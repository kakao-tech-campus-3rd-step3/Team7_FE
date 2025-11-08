import { format } from "date-fns";

export function formatDateToKrYMD(dateString: string) {
    return format(new Date(dateString), "yyyy년 MM월 dd일");
}
