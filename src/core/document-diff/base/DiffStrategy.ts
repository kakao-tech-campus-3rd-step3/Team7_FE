export abstract class DiffStrategy<T> {
    abstract process(before: string, after: string): Promise<T>;
}
