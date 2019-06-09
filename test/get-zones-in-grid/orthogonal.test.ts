import { getZonesInGrid } from '../../src/get-zones-in-grid';
import { sortZones } from './utils';

describe('getZonesInGrid orthogonal tests', () => {
  it('single zone', () => {
    const grid = [['A', 'A', 'A', 'A']];

    const zones = getZonesInGrid(grid);

    expect(zones).toMatchObject([
      { type: 'A', cells: [[0, 0], [0, 1], [0, 2], [0, 3]] },
    ]);
  });

  it('two zones in one row', () => {
    const grid = [['A', 'A', 'B', 'B']];

    const zones = getZonesInGrid(grid);

    expect(zones).toMatchObject([
      { type: 'A', cells: [[0, 0], [0, 1]] },
      { type: 'B', cells: [[0, 2], [0, 3]] },
    ]);
  });

  it('complex grid', () => {
    const grid = [
      ['C', '.', 'A', 'A'],
      ['C', '.', 'C', 'A'],
      ['C', '.', 'C', 'C'],
      ['C', '.', '.', 'C'],
      ['C', 'B', 'B', 'C'],
      ['C', '.', '.', 'C'],
    ];

    const zones = getZonesInGrid(grid);

    const expected = [
      { type: 'C', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]] },
      { type: '.', cells: [[0, 1], [1, 1], [2, 1], [3, 1], [3, 2]] },
      { type: 'A', cells: [[0, 2], [0, 3], [1, 3]] },
      { type: 'C', cells: [[1, 2], [2, 2], [2, 3], [3, 3], [4, 3], [5, 3]] },
      { type: 'B', cells: [[4, 1], [4, 2]] },
      { type: '.', cells: [[5, 1], [5, 2]] },
    ];

    expect(zones).toMatchObject(expected);
  });

  it('still works if the grid is not uniform', () => {
    const grid = [
      ['C', '.', 'A', 'A', 'oh no'],
      ['C', '.', 'C', 'A', 'oh no'],
      ['C', '.', 'C', 'C'],
      ['C', '.', '.', 'C'],
      ['C', 'B', 'B', 'C'],
      ['C', '.', '.', 'C'],
    ];

    const zones = sortZones(getZonesInGrid(grid));

    const expected = sortZones([
      { type: 'C', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]] },
      { type: '.', cells: [[0, 1], [1, 1], [2, 1], [3, 1], [3, 2]] },
      { type: 'A', cells: [[0, 2], [0, 3], [1, 3]] },
      { type: 'C', cells: [[1, 2], [2, 2], [2, 3], [3, 3], [4, 3], [5, 3]] },
      { type: 'B', cells: [[4, 1], [4, 2]] },
      { type: '.', cells: [[5, 1], [5, 2]] },
      { type: 'oh no', cells: [[0, 4], [1, 4]] },
    ]);

    expect(zones).toMatchObject(expected);
  });
});
// test-utils
