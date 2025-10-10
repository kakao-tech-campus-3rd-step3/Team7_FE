import type { CommentSchema } from "@/core/document-commenter/models/CommentSchema";

export type EventTypes = {
    "test:event": { message: string };

    "raw:mousedown": Vector2d;
    "raw:mousemove": Vector2d;
    "raw:mouseup": Vector2d;

    "selection:start": Vector2d;
    "selection:move": { start: Vector2d; current: Vector2d };
    "selection:end": { start: Vector2d; end: Vector2d };

    "comment:create:pending": CommentSchema;
};

export type EventTypeOf<T extends keyof EventTypes> = {
    type: T;
    payload: EventTypes[T];
};

export type EventHandlerOf<T extends keyof EventTypes> = (event: EventTypeOf<T>) => void;
