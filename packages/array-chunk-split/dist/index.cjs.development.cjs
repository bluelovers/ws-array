'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function arrayChunkMap(options) {
  const {
    inputArray,
    maxChunkLength,
    maxChunkSize
  } = options;
  let {
    mapMethod
  } = options;
  let result;
  if (maxChunkLength != null) {
    result = arrayChunkSplit(inputArray, maxChunkLength);
  } else if (maxChunkSize != null) {
    result = arrayChunkBySize(inputArray, maxChunkSize);
  } else {
    throw new TypeError(`maxChunkLength or maxChunkSize is required`);
  }
  if (typeof mapMethod !== 'function') {
    if (mapMethod) {
      // @ts-ignore
      mapMethod = value => value[value.length - 1];
    } else {
      // @ts-ignore
      mapMethod = value => value[0];
    }
  }
  return result.map(mapMethod);
}
/**
 * 根據區塊大小分割陣列
 * Split array into chunks by size
 *
 * 應用情境：
 * - 固定大小的資料批次
 * - 每 N 個元素一組的處理
 * - Fixed-size data batches
 * - Process every N elements as a group
 *
 * @param arr - 要分割的陣列 / Array to split
 * @param maxChunkSize - 每個區塊的大小 / Size of each chunk
 * @returns 分塊後的陣列 / Chunked array
 *
 * @example
 * // 固定區塊大小
 * arrayChunkBySize([1, 2, 3, 4, 5, 6, 7, 8], 5); // => [[1, 2, 3, 4, 5], [6, 7, 8]]
 *
 * // 多個區塊大小
 * arrayChunkBySize([1, 2, 3, 4, 5], [2, 3]); // => [[1, 2], [3, 4, 5]]
 */
function arrayChunkBySize(arr, maxChunkSize) {
  const result = [];
  const {
    length
  } = arr;
  if (Array.isArray(maxChunkSize)) {
    if (!maxChunkSize.filter(v => v && v < length).length) {
      throw new RangeError(`expected maxChunkSize.length > 0 and each values < ${length} but got ${maxChunkSize}`);
    }
    let cur = 0;
    let next;
    for (let i of maxChunkSize) {
      next = cur + i;
      result.push(arr.slice(cur, next));
      if (next >= length) {
        break;
      }
      cur = next;
    }
    if (next < length) {
      result.push(arr.slice(cur));
    }
  } else if (typeof maxChunkSize !== 'number' || maxChunkSize < 1) {
    throw new RangeError(`expected maxChunkSize > 0 but got ${maxChunkSize}`);
  } else {
    for (let i = 0; i < length; i++) {
      let next = i + maxChunkSize;
      result.push(arr.slice(i, next));
      i = next - 1;
    }
  }
  return result;
}
/**
 * 根據區塊數量分割陣列
 * Split array into specified number of chunks
 *
 * 應用情境：
 * - 均分資料到 N 個處理器
 * - 將資料均勻分配到多個頁面
 * - Distribute data evenly to N processors
 * - Distribute data evenly across multiple pages
 *
 * @param arr - 要分割的陣列 / Array to split
 * @param maxChunkLength - 區塊數量 / Number of chunks
 * @returns 分塊後的陣列 / Chunked array
 *
 * @example
 * // 分成 4 個區塊
 * arrayChunkSplit([1, 2, 3, 4, 5, 6, 7, 8], 4); // => [[1, 2], [3, 4], [5, 6], [7, 8]]
 *
 * // 分成 3 個區塊
 * arrayChunkSplit([1, 2, 3, 4, 5], 3); // => [[1, 2], [3, 4], [5]]
 */
function arrayChunkSplit(arr, maxChunkLength) {
  if (typeof maxChunkLength !== 'number' || maxChunkLength < 1) {
    throw new RangeError(`expected maxChunkLength > 0 but got ${maxChunkLength}`);
  }
  const maxChunkSize = Math.max(Math.round(arr.length / maxChunkLength), 1);
  return arrayChunkBySize(arr, maxChunkSize);
}

exports.arrayChunkBySize = arrayChunkBySize;
exports.arrayChunkMap = arrayChunkMap;
exports.arrayChunkSplit = arrayChunkSplit;
exports.default = arrayChunkSplit;
//# sourceMappingURL=index.cjs.development.cjs.map
