export type Coord = [number, number];
export type Grid<T> = ReadonlyArray<ReadonlyArray<T>>;
export type Zone<T> = { type: T; cells: Array<Coord> };

export function getZonesInGrid<T>(grid: Grid<T>): ReadonlyArray<Zone<T>> {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  const getNeighbours = (y: number, x: number): ReadonlyArray<Coord> => [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
  ];

  const isCellInGrid = ([y, x]: Coord) =>
    y >= 0 && x >= 0 && y < gridHeight && x < gridWidth;

  const zones: Zone<T>[] = [];
  const addZone = (type: T) => {
    const zone = { type, cells: [] };
    if (!zones.includes(zone)) {
      zones.push(zone);
    }
    return zone;
  };

  const visited: Coord[] = [];
  const wasVisited = ([y, x]: Coord) =>
    visited.some(([vy, vx]) => vy === y && vx === x);

  const visitCell = ([y, x]: Coord, zone: Zone<T> | null) => {
    visited.push([y, x]);
    const type = grid[y][x];

    zone = zone || addZone(type);
    zone.cells.push([y, x]);

    const neighbours = getNeighbours(y, x).filter(isCellInGrid);

    neighbours.forEach(([ny, nx]: Coord) => {
      const isMatchingNeighbour = grid[ny][nx] === type;
      if (isMatchingNeighbour && !wasVisited([ny, nx])) {
        visitCell([ny, nx], zone);
      }
    });
  };

  grid.forEach((row, y) => {
    row.forEach((_, x) => {
      if (!wasVisited([y, x])) {
        visitCell([y, x], null);
      }
    });
  });

  return zones;
}
