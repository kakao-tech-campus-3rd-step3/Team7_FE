import type { FileTypes } from "@/core/@types/FileType";

export interface DiffResult<T> {
  before: T;
  after: T;
  renderer?: FileTypes;
}

export function asDiffResult<T>(
  input: DiffResult<T> | { before: T; after: T },
  renderer?: FileTypes,
): DiffResult<T> {
  if ("renderer" in input) return input;
  return renderer ? { ...input, renderer } : { ...input };
}
