import type { DiffStrategy } from "./DiffStrategy";
import {
    resolveDiffStrategy,
    registerDiffStrategy,
    unregisterDiffStrategy,
    isDiffStrategyRegistered,
    listRegisteredDiffStrategies,
    type DiffStrategyFactoryFn,
} from "./DiffStrategyRegistry";
import type { FileTypes } from "@/core/@types/FileType";

export function createDiffStrategy<TResult = unknown>(fileType: FileTypes): DiffStrategy<TResult> {
    return resolveDiffStrategy<TResult>(fileType);
}

export {
    registerDiffStrategy,
    unregisterDiffStrategy,
    isDiffStrategyRegistered,
    listRegisteredDiffStrategies,
};
export type { DiffStrategyFactoryFn } from "./DiffStrategyRegistry";

export function registerBuiltinDiffStrategies(
    creators: Partial<Record<FileTypes, DiffStrategyFactoryFn<unknown>>>,
) {
    Object.entries(creators).forEach(([type, factory]) => {
        if (factory) registerDiffStrategy(type as FileTypes, factory);
    });
}
