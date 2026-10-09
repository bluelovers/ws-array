(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ArrayChunkSplit = {}));
})(this, (function (exports) { 'use strict';

	/**
	 * 映射回調函式介面
	 * Map callback function interface
	 *
	 * @template T - 元素類型 / Element type
	 * @template R - 回傳類型 / Return type
	 */

	/**
	 * 陣列分塊選項
	 * Array chunking options
	 *
	 * @property inputArray - 來源陣列 / Source array
	 * @property maxChunkLength - 每個區塊的最大長度 / Maximum length per chunk
	 * @property maxChunkSize - 每個區塊的最大大小 / Maximum size per chunk
	 */

	/**
	 * 對分塊後的陣列進行映射轉換
	 * Map over chunked arrays with transformation
	 *
	 * 應用情境：
	 * - 分塊處理大型資料集
	 * - 批次 API 請求
	 * - 將連續資料分割後進行平行處理
	 * - Process large datasets in chunks
	 * - Batch API requests
	 * - Split continuous data for parallel processing
	 *
	 * @param options - 分塊選項 / Chunking options
	 * @returns 映射後的結果陣列 / Mapped result array
	 *
	 * @example
	 * // 預設返回每個區塊的第一個元素
	 * arrayChunkMap({
	 *   inputArray: [1, 2, 3, 4, 5, 6, 7, 8],
	 *   maxChunkLength: 4
	 * }); // => [1, 3, 5, 7]
	 *
	 * // 返回每個區塊的最後一個元素
	 * arrayChunkMap({
	 *   inputArray: [1, 2, 3, 4, 5, 6, 7, 8],
	 *   maxChunkLength: 4,
	 *   mapMethod: true
	 * }); // => [2, 4, 6, 8]
	 *
	 * // 自訂映射函式
	 * arrayChunkMap({
	 *   inputArray: [1, 2, 3, 4, 5, 6],
	 *   maxChunkSize: 2,
	 *   mapMethod: (chunk) => chunk.reduce((a, b) => a + b, 0)
	 * }); // => [3, 7, 11]
	 */

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

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.development.cjs.map
