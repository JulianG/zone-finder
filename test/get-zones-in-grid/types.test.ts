import { getZonesInGrid } from '../../src/get-zones-in-grid';
import { sortZones } from './utils';

describe('getZonesInGrid type tests', () => {

  it('works with strings', () => {
    const grid = [
      ['A', 'C', 'D'], //
      ['B', 'C', 'C'], //
      ['B', 'C', 'C'], //
    ];

    const zones = sortZones(getZonesInGrid(grid));

    expect(zones).toMatchObject(
      sortZones([
        { type: 'A', cells: [[0, 0]] },
        { type: 'B', cells: [[1, 0], [2, 0]] },
        { type: 'C', cells: [[0, 1], [1, 1], [2, 1], [2, 2], [1, 2]] },
        { type: 'D', cells: [[0, 2]] },
      ])
    );
  });

  it('works with numbers', () => {
    const grid = [
      [1000, 1002, 1005], //
      [1001, 1002, 1002], //
      [1001, 1002, 1002], //
    ];

    const zones = sortZones(getZonesInGrid(grid));

    expect(zones).toMatchObject(
      sortZones([
        { type: 1000, cells: [[0, 0]] },
        { type: 1001, cells: [[1, 0], [2, 0]] },
        { type: 1002, cells: [[0, 1], [1, 1], [2, 1], [2, 2], [1, 2]] },
        { type: 1005, cells: [[0, 2]] },
      ])
    );
  });

  it('works with booleans', () => {
    const grid = [
      [false, false, false], //
      [true, true, true], //
      [true, true, false], //
    ];

    const zones = sortZones(getZonesInGrid(grid));

    expect(zones).toMatchObject(
      sortZones([
        { type: false, cells: [[2, 2]] },
        { type: false, cells: [[0, 0], [0, 1], [0, 2]] },
        { type: true, cells: [[1, 0], [2, 0], [2, 1], [1, 1], [1, 2]] },
      ])
    );
  });

  it('works with Symbols', () => {
    const land = Symbol('land');
    const water = Symbol('water');

    const grid = [
      [water, water, water], //
      [land, land, land], //
      [land, land, water], //
    ];

    const zones = getZonesInGrid(grid);

    expect(zones).toMatchObject([
      { type: water, cells: [[0, 0], [0, 1], [0, 2]] },
      { type: land, cells: [[1, 0], [2, 0], [2, 1], [1, 1], [1, 2]] },
      { type: water, cells: [[2, 2]] },
    ]);
  });

  it('works with emoji 😛', () => {
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