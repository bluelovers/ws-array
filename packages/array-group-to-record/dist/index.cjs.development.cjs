'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hashSum = require('hash-sum');

/**
 * 處理選項，回填預設值
 * Handle options, fill in defaults
 *
 * 應用情境：
 * - 當未提供 getKey 時，使用 hash-sum 作為預設鍵生成函式
 * - When getKey is not provided, use hash-sum as default key generator
 *
 * @param options - 輸入選項 / Input options
 * @returns 處理後的選項 / Processed options
 */
function handleOptions(options) {
  var _options$getKey;
  const getKey = (_options$getKey = options === null || options === void 0 ? void 0 : options.getKey) !== null && _options$getKey !== void 0 ? _options$getKey : item => hashSum(item);
  return {
    ...options,
    getKey
  };
}
/**
 * 將陣列分組為 Record
 * Group array elements into Record
 *
 * 應用情境：
 * - 根據物件屬性將陣列分組
 * - 實現類似 SQL 的 GROUP BY 功能
 * - 統計分類數量
 * - Group array by object properties
 * - Implement SQL-like GROUP BY functionality
 * - Count categories
 *
 * @param arr - 要分組的陣列 / Array to group
 * @param options - 分組選項 / Grouping options
 * @returns 分組後的 Record / Grouped Record
 *
 * @example
 * // 基本使用
 * arrayGroupToRecord(['a', 'b', 'ab', 'abc'], {
 *   getKey: (item) => item.length
 * });
 * // => { '1': ['a', 'b'], '2': ['ab'], '3': ['abc'] }
 *
 * // 物件分組
 * arrayGroupToRecord([
 *   { type: 'fruit', name: 'apple' },
 *   { type: 'fruit', name: 'banana' },
 *   { type: 'veg', name: 'carrot' }
 * ], {
 *   getKey: (item) => item.type
 * });
 * // => { fruit: [...], veg: [...] }
 */
function arrayGroupToRecord(arr, options) {
  var _init;
  const {
    getKey,
    init
  } = handleOptions(options);
  return arr.reduce((map, item, index, arr) => {
    var _map$id;
    const id = getKey(item, index, arr);
    (_map$id = map[id]) !== null && _map$id !== void 0 ? _map$id : map[id] = [];
    map[id].push(item);
    return map;
  }, (_init = init === null || init === void 0 ? void 0 : init()) !== null && _init !== void 0 ? _init : {});
}
/**
 * 將陣列分組為 Map
 * Group array elements into Map
 *
 * 應用情境：
 * - 需要使用 Map API 的場景
 * - 保持插入順序
 * - Need to use Map API scenarios
 * - Maintain insertion order
 *
 * @param arr - 要分組的陣列 / Array to group
 * @param options - 分組選項 / Grouping options
 * @returns 分組後的 Map / Grouped Map
 *
 * @example
 * arrayGroupToMap([1, 2, 3, 4, 5], {
 *   getKey: (item) => item % 2 === 0 ? 'even' : 'odd'
 * });
 * // => Map { 'odd' => [1, 3, 5], 'even' => [2, 4] }
 */
function arrayGroupToMap(arr, options) {
  var _init2;
  const {
    getKey,
    init
  } = handleOptions(options);
  return arr.reduce((map, item, index, arr) => {
    var _map$get;
    const id = getKey(item, index, arr);
    const a = (_map$get = map.get(id)) !== null && _map$get !== void 0 ? _map$get : [];
    a.push(item);
    map.set(id, a);
    return map;
  }, (_init2 = init === null || init === void 0 ? void 0 : init()) !== null && _init2 !== void 0 ? _init2 : new Map());
}
/**
 * 計算分組後的總元素數量
 * Calculate total element count after grouping
 *
 * 應用情境：
 * - 計算分組後的總數
 * - 驗證資料完整性
 * - Calculate total after grouping
 * - Verify data integrity
 *
 * @param group - 分組資料（Record 或 Map）/ Grouped data (Record or Map)
 * @returns 總元素數量 / Total element count
 *
 * @example
 * sumGroup({ a: [1, 2], b: [3, 4, 5] }); // => 5
 * sumGroup(new Map([['a', [1, 2]], ['b', [3, 4, 5]]])); // => 5
 */
function sumGroup(group) {
  let len = 0;
  if (typeof group.forEach === 'undefined') {
    // @ts-ignore
    group = Object.values(group);
  }
  // @ts-ignore
  group.forEach(b => len += b.length);
  return len;
}

exports.arrayGroupToMap = arrayGroupToMap;
exports.arrayGroupToRecord = arrayGroupToRecord;
exports.default = arrayGroupToRecord;
exports.handleOptions = handleOptions;
exports.sumGroup = sumGroup;
//# sourceMappingURL=index.cjs.development.cjs.map
