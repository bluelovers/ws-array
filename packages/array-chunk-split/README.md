# README

    Split an array into arrays with max chunk length

## install

```
yarn add array-chunk-split
```

> [API](index.d.ts)

```ts
import { arrayChunkBySize, arrayChunkSplit } from 'array-chunk-split';

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.dir(arrayChunkSplit(arr, 4));
// => [[1, 2], [3, 4], [5, 6], [7, 8]]

console.dir(arrayChunkBySize(arr, 5));
// => [[1, 2, 3, 4, 5], [6, 7, 8]]
```

