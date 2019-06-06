import { getZonesInGrid, Zone } from '../src/get-zones-in-grid';

describe('getZonesInGrid "happy path" tests', () => {
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

  it('works if the grid is not uniform', () => {
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

  it('works with emoji 😎', () => {
    const grid = [
      ['🌑', '🤔', '🐷'], //
      ['🦊', '🤔', '🤔'], //
      ['🦊', '🤔', '🤔'], //
    ];

    const zones = sortZones(getZonesInGrid(grid));

    expect(zones).toMatchObject(
      sortZones([
        { type: '🌑', cells: [[0, 0]] },
        { type: '🦊', cells: [[1, 0], [2, 0]] },
        { type: '🤔', cells: [[0, 1], [1, 1], [2, 1], [2, 2], [1, 2]] },
        { type: '🐷', cells: [[0, 2]] },
      ])
    );
  });
});

// test-utils

function sortZones<T>(zones: ReadonlyArray<Zone<T>>): ReadonlyArray<Zone<T>> {
  return [...zones].sort((a, b) => {
    if (a.type === b.type) {
      return a.cells.length - b.cells.length;
    } else {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
    }
  });
}
