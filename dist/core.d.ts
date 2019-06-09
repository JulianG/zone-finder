export declare type Coords = [number, number];
export declare type Grid<T> = ReadonlyArray<ReadonlyArray<T>>;
export declare type Zone<T> = {
    type: T;
    cells: Array<Coords>;
};
