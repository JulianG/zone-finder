(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['zone-finder'] = {}));
}(this, function (exports) { 'use strict';

  function getOthogonalNeighbours([y, x]) {
    return [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
  }

  function getZonesInGrid(grid, getNeighbours = getOthogonalNeighbours) {
    //
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;

    const getCellType = ([y, x]) => grid[y][x];

    const isInGrid = ([y, x]) => {
      return y >= 0 && x >= 0 && y < gridHeight && x < gridWidth;
    };

    const zones = [];

    const addZone = type => {
      const zone = {
        type,
        cells: []
      };
      zones.push(zone);
      return zone;
    };

    const visited = [];

    const wasVisited = ([y, x]) => {
      return visited.some(([vy, vx]) => vy === y && vx === x);
    };

    const visitCoords = (coords, zone) => {
      //
      visited.push(coords);
      const type = getCellType(coords);
      zone = zone || addZone(type);
      zone.cells.push(coords);

      const isMatchingNeighbour = coords => getCellType(coords) === type;

      const matchingNeighbours = getNeighbours(coords).filter(isInGrid).filter(isMatchingNeighbour);
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

  function getAllCoordinates(grid) {
    return grid.reduce((acc, row, y) => {
      return [...acc, ...row.map((_, x) => {
        return [y, x];
      })];
    }, []);
  }

  exports.getZonesInGrid = getZonesInGrid;

}));
//# sourceMappingURL=zone-finder.umd.development.js.map
