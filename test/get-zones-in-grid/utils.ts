import { Zone } from '../../src/core';

export function sortZones<T>(
  zones: ReadonlyArray<Zone<T>>
): ReadonlyArray<Zone<T>> {
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
