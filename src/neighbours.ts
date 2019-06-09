import { Coords } from 'core';

export function getOthogonalNeighbours([y, x]: Coords): ReadonlyArray<Coords> {
  return [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
}

export function getDiagonalNeighbours([y, x]: Coords): ReadonlyArray<Coords> {
  return [[y - 1, x - 1], [y + 1, x + 1], [y + 1, x - 1], [y - 1, x + 1]];
}

export function getAllNeighbours([y, x]: Coords): ReadonlyArray<Coords> {
  return getOthogonalNeighbours([y, x]).concat(getDiagonalNeighbours([y, x]));
}