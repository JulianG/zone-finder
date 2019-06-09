# Zone Finder

Easily detect adjacent zones in a 2D grid.

### Step 1. Install the package

No NPM. You can install from the GitHub repo.

```
yarn add https://github.com/JulianG/zone-finder
```

### Step 2. Use it

Each element in the grid must be a primitive type (boolean, number, string, Symbol).

```ts
import { getZonesInGrid } from "zone-finder";

...

const grid = [
  ['C', '.', 'A', 'A'],
  ['C', '.', 'C', 'A'],
  ['C', '.', 'C', 'C'],
  ['C', '.', '.', 'C'],
  ['C', 'B', 'B', 'C'],
  ['C', '.', '.', 'C'],
];

...

const zones = getZonesInGrid(grid);
```

### Step 3. Profit!

Now `zones` is an array of zones.  
Each zone contains a `type` and a `cells` array of coordinates.

```ts
[
  { type: 'C', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]] },
  { type: '.', cells: [[0, 1], [1, 1], [2, 1], [3, 1], [3, 2]] },
  { type: 'A', cells: [[0, 2], [0, 3], [1, 3]] },
  { type: 'C', cells: [[1, 2], [2, 2], [2, 3], [3, 3], [4, 3], [5, 3]] },
  { type: 'B', cells: [[4, 1], [4, 2]] },
  { type: '.', cells: [[5, 1], [5, 2]] },
  { type: 'oh no', cells: [[0, 4], [1, 4]] }
]
```

### Extras

By default the function finds zones of cells of the same type which are **orthogonally adjacent**. But if you want to include diagonal neighbours as well, you can pass a second argument with a function that returns the neighbours.

```ts

import { getZonesInGrid, getAllNeighbours } from "zone-finder";

const grid = [
      ['C', '.'], //
      ['C', '.'], //
      ['.', 'C'], //
      ['.', 'C'], //
    ];

const zones = getZonesInGrid(grid, getAllNeighbours);
```

## Contribute

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx). Read below for more details.

```
yarn install
yarn test
yarn build
```

## Show & Tell

Please let me know if you make something cool with this!

```




```

# TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
