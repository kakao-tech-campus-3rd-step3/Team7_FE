export type EventTypes = {
    [key: string]: unknown;

    "document:mousedown": Vector2d;
    "document:mousemove": Vector2d;
    "document:mouseup": Vector2d;

    "selection:start": Vector2d;
    "selection:move": { start: Vector2d; current: Vector2d };
    "selection:end": { start: Vector2d; end: Vector2d };
};

export type EventTypeOf<T extends keyof EventTypes> = {
    type: T;
    payload: EventTypes[T];
};

export type EventHandlerOf<T extends keyof EventTypes> = (event: EventTypeOf<T>) => void;
