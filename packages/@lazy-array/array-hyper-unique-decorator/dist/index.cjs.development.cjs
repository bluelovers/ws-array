'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arrayHyperUnique = require('array-hyper-unique');

/**
 * 裝飾器工廠核心函式
 * Decorator factory core function
 *
 * 應用情境：
 * - 自動將函式回傳值進行去重處理
 * - 用於快取或資料處理流程中確保回傳值唯一
 * - Automatically deduplicate function return values
 * - Used in caching or data processing pipelines
 *
 * @param fn - 去重函式 / Deduplication function
 * @param options - 去重選項 / Deduplication options
 * @returns 裝飾器 / Decorator
 */
function _core(fn, options) {
  return (target, propertyKey, descriptor) => {
    const old = descriptor.value;
    // @ts-ignore
    descriptor.value = function (...argv) {
      return fn(old.apply(this, argv), options);
    };
  };
}
/**
 * 異步裝飾器工廠核心函式
 * Async decorator factory core function
 *
 * 應用情境：
 * - 處理 Promise 回傳值，自動對解析後的資料進行去重
 * - 適用於非同步資料獲取和處理流程
 * - Handle Promise return values, automatically deduplicate resolved data
 * - Suitable for async data fetching and processing pipelines
 *
 * @param fn - 去重函式 / Deduplication function
 * @param options - 去重選項 / Deduplication options
 * @returns 異步裝飾器 / Async decorator
 */
function _coreAsync(fn, options) {
  return (target, propertyKey, descriptor) => {
    const old = descriptor.value;
    // @ts-ignore
    descriptor.value = function (...argv) {
      return old.apply(this, argv).then(value => fn(value, options));
    };
  };
}
/**
 * 同步陣列去重裝飾器
 * Synchronous array deduplication decorator
 *
 * 應用情境：
 * - 自動對方法回傳的陣列進行深度去重
 * - 適合用於 API 資料處理、快取結果處理
 * - Automatically deep deduplicate arrays returned by methods
 * - Suitable for API data processing, cache result handling
 *
 * @param options - 去重選項 / Deduplication options
 * @returns 裝飾器 / Decorator
 *
 * @example
 * class DataService {
 *   @ArrayUniqueDecorator()
 *   getItems() {
 *     return [{id: 1}, {id: 1}, {id: 2}]; // 只會回傳 [{id: 1}, {id: 2}]
 *   }
 * }
 */
function ArrayUniqueDecorator(options) {
  return _core(arrayHyperUnique.array_unique, options);
}
/**
 * 覆寫模式陣列去重裝飾器
 * Overwrite mode array deduplication decorator
 *
 * 應用情境：
 * - 在原陣列上進行去重修改，節省記憶體
 * - Modify array in-place for memory efficiency
 *
 * @param options - 去重選項 / Deduplication options
 * @returns 裝飾器 / Decorator
 */
function ArrayUniqueOverwriteDecorator(options) {
  return _core(arrayHyperUnique.array_unique_overwrite, options);
}
/**
 * 異步陣列去重裝飾器
 * Async array deduplication decorator
 *
 * 應用情境：
 * - 處理非同步方法回傳的 Promise，解析後進行去重
 * - 適合用於非同步 API 資料獲取後的處理
 * - Handle Promise returns from async methods, deduplicate after resolution
 * - Suitable for async API data fetching and processing
 *
 * @param options - 去重選項 / Deduplication options
 * @returns 異步裝飾器 / Async decorator
 *
 * @example
 * class ApiService {
 *   @ArrayUniqueAsyncDecorator()
 *   async fetchItems() {
 *     return Promise.resolve([{id: 1}, {id: 1}, {id: 2}]);
 *   }
 * }
 */
function ArrayUniqueAsyncDecorator(options) {
  return _coreAsync(arrayHyperUnique.array_unique, options);
}
/**
 * 異步覆寫模式陣列去重裝飾器
 * Async overwrite mode array deduplication decorator
 *
 * @param options - 去重選項 / Deduplication options
 * @returns 異步裝飾器 / Async decorator
 */
function ArrayUniqueOverwriteAsyncDecorator(options) {
  return _coreAsync(arrayHyperUnique.array_unique_overwrite, options);
}

exports.ArrayUniqueAsyncDecorator = ArrayUniqueAsyncDecorator;
exports.ArrayUniqueDecorator = ArrayUniqueDecorator;
exports.ArrayUniqueOverwriteAsyncDecorator = ArrayUniqueOverwriteAsyncDecorator;
exports.ArrayUniqueOverwriteDecorator = ArrayUniqueOverwriteDecorator;
exports.default = ArrayUniqueDecorator;
//# sourceMappingURL=index.cjs.development.cjs.map
