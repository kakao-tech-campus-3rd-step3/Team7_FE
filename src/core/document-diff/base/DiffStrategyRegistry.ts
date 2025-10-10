import type { DiffStrategy } from "./DiffStrategy";
import { FileType, type FileTypes } from "@/core/@types/FileType";

export type DiffStrategyFactoryFn<TResult = unknown> = () => DiffStrategy<TResult>;

const registry = new Map<FileTypes, DiffStrategyFactoryFn<any>>();

export function registerDiffStrategy<TResult = unknown>(
    type: FileTypes,
    factory: DiffStrategyFactoryFn<TResult>,
): void {
    registry.set(type, factory as DiffStrategyFactoryFn<any>);
}

export function unregisterDiffStrategy(type: FileTypes): void {
    registry.delete(type);
}

export function isDiffStrategyRegistered(type: FileTypes): boolean {
    return registry.has(type);
}

export function listRegisteredDiffStrategies(): FileTypes[] {
    return Array.from(registry.keys());
}

export function resolveDiffStrategy<TResult = unknown>(type: FileTypes): DiffStrategy<TResult> {
    const factory = registry.get(type);
    if (!factory) {
        const known = Object.values(FileType).join(", ");
        throw new Error(
            `[DiffStrategyRegistry] Strategy not registered for "${type}". Registered: ${
                listRegisteredDiffStrategies().join(", ") || "(none)"
            } / Known: ${known}`,
        );
    }
    return (factory as DiffStrategyFactoryFn<TResult>)();
}
