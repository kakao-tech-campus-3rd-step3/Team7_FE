export type DiffStrategy<T> = {
    process: (before: string, after: string) => Promise<T>;
};
