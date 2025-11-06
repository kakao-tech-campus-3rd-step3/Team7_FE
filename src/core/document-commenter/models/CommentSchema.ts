export interface CommentSchema {
    status: "pending" | "success" | "error";

    id: number;
    content: string;

    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
