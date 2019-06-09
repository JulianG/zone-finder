import { Coords, Grid, Zone } from 'core';
export declare function getZonesInGrid<T>(grid: Grid<T>, getNeighbours?: (coords: Coords) => ReadonlyArray<Coords>): ReadonlyArray<Zone<T>>;
