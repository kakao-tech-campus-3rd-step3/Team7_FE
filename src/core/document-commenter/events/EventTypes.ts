import type { CommentSchema } from "@/core/document-commenter/models/CommentSchema";

export type EventTypes = {
    "test:event": { message: string };

    "raw:mousedown": Vector2d;
    "raw:mousemove": Vector2d;
    "raw:mouseup": Vector2d;

    "raw:pointerdown": { x: number; y: number; button: number; pointerId: number };
    "raw:pointermove": { x: number; y: number; pointerId: number };
    "raw:pointerup": { pointerId: number };

    "raw:keydown": { key: string; ctrlKey: boolean; shiftKey: boolean; altKey: boolean };
    "raw:keyup": { key: string; ctrlKey: boolean; shiftKey: boolean; altKey: boolean };

    "raw:wheel": { deltaY: number };

    "selection:start": Vector2d;
    "selection:move": { start: Vector2d; current: Vector2d };
    "selection:end": { start: Vector2d; end: Vector2d };

    "zoom:change": { scale: number };

    "pan:start": Vector2d;
    "pan:move": { dx: number; dy: number };
    "pan:end": Vector2d;

    "comment:create:pending": CommentSchema;
};

export type EventTypeOf<T extends keyof EventTypes> = {
    type: T;
    payload: EventTypes[T];
};

export type EventHandlerOf<T extends keyof EventTypes> = (event: EventTypeOf<T>) => void;
