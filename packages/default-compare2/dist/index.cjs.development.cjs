'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 取得目標的類型字串
 * Get the type string of target
 *
 * 應用情境：
 * - 區分 null 和 undefined
 * - 取得精確的類型名稱
 * - Distinguish between null and undefined
 * - Get precise type name
 *
 * @param target - 要取得類型的值 / Value to get type from
 * @returns 類型字串 ('null' | 'undefined' | typeof result) / Type string
 *
 * @example
 * _typeOf(null);  // => 'null'
 * _typeOf(undefined); // => 'undefined'
 * _typeOf('hello');  // => 'string'
 * _typeOf(123);      // => 'number'
 */
function _typeOf(target) {
  if (target === null) {
    return 'null';
  }
  return typeof target;
}

/**
 * 排序比較結果枚舉
 * Sort compare result enum
 *
 * @property KEEP - 保持原位 / Keep position
 * @property RIGHT - 排在右邊（較大）/ Place on right (greater)
 * @property LEFT - 排在左邊（較小）/ Place on left (smaller)
 */
exports.EnumSortCompareResult = void 0;
(function (EnumSortCompareResult) {
  EnumSortCompareResult[EnumSortCompareResult["KEEP"] = 0] = "KEEP";
  EnumSortCompareResult[EnumSortCompareResult["RIGHT"] = 1] = "RIGHT";
  EnumSortCompareResult[EnumSortCompareResult["LEFT"] = -1] = "LEFT";
})(exports.EnumSortCompareResult || (exports.EnumSortCompareResult = {}));
/**
 * 數值比較函式
 * Number compare function
 *
 * 應用情境：
 * - 比較兩個數值的大小
 * - 用於排序演算法
 * - Compare two numeric values
 * - Used in sorting algorithms
 *
 * @param a - 要比較的第一個值 / First value to compare
 * @param b - 要比較的第二個值 / Second value to compare
 * @returns 比較結果 / Compare result: -1, 0, or 1
 */
function numberCompare(a, b) {
  if (a < b) {
    return -1 /* EnumSortCompareResult.LEFT */;
  } else if (a > b) {
    return 1 /* EnumSortCompareResult.RIGHT */;
  }
  return 0 /* EnumSortCompareResult.KEEP */;
}
/**
 * null 和 undefined 比較函式
 * Null and undefined compare function
 *
 * 當 a 和 b 都不是 null 或 undefined 時返回 undefined。
 * Returns undefined when both a and b are not null/undefined.
 *
 * 應用情境：
 * - 處理混合包含 null 和 undefined 的陣列排序
 * - 確保 null 和 undefined 有確定的排序順序
 * - Handle array sorting with mixed null and undefined values
 * - Ensure null and undefined have definite sort order
 *
 * @param a - 要比較的第一個值 / First value to compare
 * @param b - 要比較的第二個值 / Second value to compare
 * @returns 比較結果或 undefined / Compare result or undefined
 */
function nullCompare(a, b) {
  const typeA = _typeOf(a);
  const typeB = _typeOf(b);
  if (typeA === 'null') {
    return typeB === 'null' ? 0 /* EnumSortCompareResult.KEEP */ : typeB === 'undefined' ? -1 /* EnumSortCompareResult.LEFT */ : 1 /* EnumSortCompareResult.RIGHT */;
  } else if (typeA === 'undefined') {
    return typeB === 'null' ? 1 /* EnumSortCompareResult.RIGHT */ : typeB === 'undefined' ? 0 /* EnumSortCompareResult.KEEP */ : 1 /* EnumSortCompareResult.RIGHT */;
  } else if (typeB === 'null' || typeB === 'undefined') {
    return -1 /* EnumSortCompareResult.LEFT */;
  }
}
/**
 * Symbol 比較函式
 * Symbol compare function
 *
 * 應用情境：
 * - 處理包含 Symbol 鍵的物件排序
 * - 確保 Symbol 在排序中有正確的位置
 * - Handle object sorting with Symbol keys
 * - Ensure Symbol has correct position in sorting
 *
 * @param a - 要比較的第一個值 / First value to compare
 * @param b - 要比較的第二個值 / Second value to compare
 * @returns 比較結果 / Compare result
 */
function symbolCompare(a, b) {
  const typeA = _typeOf(a);
  const typeB = _typeOf(b);
  if (typeA === 'symbol') {
    return typeB === 'symbol' ? numberCompare(String(a), String(b)) : -1 /* EnumSortCompareResult.LEFT */;
  } else if (typeB === 'symbol') {
    return 1 /* EnumSortCompareResult.RIGHT */;
  }
  return numberCompare(a, b);
}
/**
 * 日期比較函式
 * Date compare function
 *
 * 應用情境：
 * - 比較兩個日期的先後順序
 * - 對日期陣列進行排序
 * - Compare two dates
 * - Sort date arrays
 *
 * @param a - 要比較的第一個日期 / First date to compare
 * @param b - 要比較的第二個日期 / Second date to compare
 * @returns 比較結果 / Compare result
 *
 * @example
 * dateCompare(new Date('2023-01-01'), new Date('2023-01-02')); // => -1
 */
function dateCompare(a, b) {
  return a.getTime() - b.getTime();
}
/**
 * 本地化字串比較函式
 * Locale string compare function
 *
 * 應用情境：
 * - 根據語言環境進行字串排序
 * - 支援多語言的正確排序
 * - Sort strings according to locale
 * - Support correct sorting for multiple languages
 *
 * @param a - 要比較的第一個字串 / First string to compare
 * @param b - 要比較的第二個字串 / Second string to compare
 * @returns 比較結果 / Compare result
 *
 * @example
 * stringCompareLocale('banana', 'Apple'); // => 1 (根據本地化規則)
 */
function stringCompareLocale(a, b) {
  return a.localeCompare(b);
}

/**
 * 基本預設比較函式
 * Basic default compare function
 *
 * 應用情境：
 * - 處理 null、undefined 和數字的排序
 * - 與 Array.sort 配合使用時提供一致的行為
 * - Handle null, undefined and number sorting
 * - Provide consistent behavior when used with Array.sort
 *
 * @param a - 要比較的第一個值 / First value to compare
 * @param b - 要比較的第二個值 / Second value to compare
 * @returns 比較結果 / Compare result
 */
function defaultCompareBasic(a, b) {
  const result = nullCompare(a, b);
  if (typeof result === 'number') {
    return result;
  }
  return numberCompare(a, b);
}
/**
 * 支援 Symbol 的預設比較函式
 * Default compare function with Symbol support
 *
 * 應用情境：
 * - 處理包含 Symbol 鍵的物件排序
 * - 需要對符號類型進行排序的場景
 * - Handle object sorting with Symbol keys
 * - Scenarios requiring symbol type sorting
 *
 * @param a - 要比較的第一個值 / First value to compare
 * @param b - 要比較的第二個值 / Second value to compare
 * @returns 比較結果 / Compare result
 *
 * @example
 * const arr = [Symbol('a'), Symbol('b'), 1, null, undefined, 'z'];
 * arr.sort(defaultCompareWithSymbol);
 * console.log(arr); // [null, undefined, 1, Symbol(a), Symbol(b), 'z']
 */
function defaultCompareWithSymbol(a, b) {
  const result = nullCompare(a, b);
  if (typeof result === 'number') {
    return result;
  }
  return symbolCompare(a, b);
}
/**
 * 使用 Symbol 支援對陣列進行排序
 * Sort array with Symbol support
 *
 * @param arr - 要排序的陣列 / Array to sort
 * @returns 排序後的陣列 / Sorted array
 */
function arraySortWithSymbol(arr) {
  return arr.sort(defaultCompareWithSymbol);
}

exports._typeOf = _typeOf;
exports.arraySortWithSymbol = arraySortWithSymbol;
exports.dateCompare = dateCompare;
exports.default = defaultCompareWithSymbol;
exports.defaultCompare = defaultCompareWithSymbol;
exports.defaultCompareBasic = defaultCompareBasic;
exports.defaultCompareWithSymbol = defaultCompareWithSymbol;
exports.nullCompare = nullCompare;
exports.numberCompare = numberCompare;
exports.stringCompareLocale = stringCompareLocale;
exports.symbolCompare = symbolCompare;
//# sourceMappingURL=index.cjs.development.cjs.map
