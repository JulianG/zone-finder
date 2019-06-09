import { getZonesInGrid } from '../../src/get-zones-in-grid';
import { getAllNeighbours } from '../../src/neighbours';

describe('getZonesInGrid diagonal tests', () => {
  it('complex grid', () => {
    const grid = [
      ['C', '.'], //
      ['C', '.'], //
      ['.', 'C'], //
      ['.', 'C'], //
    ];

    const zones = getZonesInGrid(grid, getAllNeighbours);

    const expected = [
      { type: 'C', cells: [[0, 0], [1, 0], [2, 1], [3, 1]] },
      { type: '.', cells: [[0, 1], [1, 1], [2, 0], [3, 0]] },
    ];

    expect(zones).toMatchObject(expected);
  });
});