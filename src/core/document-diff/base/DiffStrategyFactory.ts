import type { DiffStrategy } from "./DiffStrategy";
import { get, register, unregister, has, list, type FactoryFn } from "./DiffStrategyRegistry";
import type { FileTypes } from "@/core/@types/FileType";

export function createDiffStrategy<TResult = unknown>(fileType: FileTypes): DiffStrategy<TResult> {
    return get<TResult>(fileType);
}

export { register, unregister, has, list };
export type { FactoryFn };

export {
    register as registerDiffStrategy,
    unregister as unregisterDiffStrategy,
    has as isDiffStrategyRegistered,
    list as listRegisteredDiffStrategies,
};

export function registerBuiltinDiffStrategies(
    creators: Partial<Record<FileTypes, FactoryFn<unknown>>>,
) {
    Object.entries(creators).forEach(([type, factory]) => {
        if (factory) register(type as FileTypes, factory);
    });
}
