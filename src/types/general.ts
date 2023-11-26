export enum Status {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export type NonEmptyArray<T> = [T, ...T[]];
