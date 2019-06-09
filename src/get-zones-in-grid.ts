import { Coords, Grid, Zone } from 'core';
import { getOthogonalNeighbours } from './neighbours';

export function getZonesInGrid<T>(
  grid: Grid<T>,
  getNeighbours: (
    coords: Coords
  ) => ReadonlyArray<Coords> = getOthogonalNeighbours
): ReadonlyArray<Zone<T>> {
  //
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  const getCellType = ([y, x]: Coords) => grid[y][x];

  const isInGrid = ([y, x]: Coords) => {
    return y >= 0 && x >= 0 && y < gridHeight && x < gridWidth;
  };

  const zones: Zone<T>[] = [];
  const addZone = (type: T) => {
    const zone = { type, cells: [] };
    zones.push(zone);
    return zone;
  };

  const visited: Coords[] = [];
  const wasVisited = ([y, x]: Coords) => {
    return visited.some(([vy, vx]) => vy === y && vx === x);
  };

  const visitCoords = (coords: Coords, zone: Zone<T> | null) => {
    //
    visited.push(coords);
    const type = getCellType(coords);

    zone = zone || addZone(type);
    zone.cells.push(coords);

    const isMatchingNeighbour = (coords: Coords) =>
      getCellType(coords) === type;

    const matchingNeighbours = getNeighbours(coords)
      .filter(isInGrid)
      .filter(isMatchingNeighbour);

    matchingNeighbours.forEach(nCoords => {
      if (!wasVisited(nCoords)) {
        visitCoords(nCoords, zone);
      }
    });
  };

  getAllCoordinates(grid).forEach(coords => {
    if (!wasVisited(coords)) {
      visitCoords(coords, null);
    }
  });

  return zones;
}

function getAllCoordinates<T>(grid: Grid<T>): ReadonlyArray<Coords> {
  return grid.reduce(
    (acc, row, y) => {
      return [
        ...acc,
        ...row.map((_, x) => {
          return [y, x] as Coords;
        }),
      ];
    },
    [] as Coords[]
  );
}
