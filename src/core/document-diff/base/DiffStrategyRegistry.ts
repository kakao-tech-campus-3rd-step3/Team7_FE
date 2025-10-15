import type { DiffStrategy } from "./DiffStrategy";
import { FileType, type FileTypes } from "@/core/@types/FileType";

export type FactoryFn<TResult = unknown> = () => DiffStrategy<TResult>;

const registry = new Map<FileTypes, FactoryFn<unknown>>();

export function register<TResult = unknown>(type: FileTypes, factory: FactoryFn<TResult>): void {
    registry.set(type, factory as FactoryFn<unknown>);
}

export function unregister(type: FileTypes): void {
    registry.delete(type);
}

export function has(type: FileTypes): boolean {
    return registry.has(type);
}

export function list(): FileTypes[] {
    return Array.from(registry.keys());
}

export function get<TResult = unknown>(type: FileTypes): DiffStrategy<TResult> {
    const factory = registry.get(type);
    if (!factory) {
        const known = Object.values(FileType).join(", ");
        throw new Error(
            `[DiffStrategyRegistry] Strategy not registered for "${type}". Registered: ${
                list().join(", ") || "(none)"
            } / Known: ${known}`,
        );
    }
    return (factory as FactoryFn<TResult>)();
}
