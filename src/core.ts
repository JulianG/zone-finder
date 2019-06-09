export type Coords = [number, number];
export type Grid<T> = ReadonlyArray<ReadonlyArray<T>>;
export type Zone<T> = { type: T; cells: Array<Coords> };