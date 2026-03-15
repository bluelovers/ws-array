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
export declare function _typeOf(target: unknown): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null";
/**
 * 排序比較結果枚舉
 * Sort compare result enum
 *
 * @property KEEP - 保持原位 / Keep position
 * @property RIGHT - 排在右邊（較大）/ Place on right (greater)
 * @property LEFT - 排在左邊（較小）/ Place on left (smaller)
 */
export declare const enum EnumSortCompareResult {
	KEEP = 0,
	RIGHT = 1,
	LEFT = -1
}
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
export declare function numberCompare(a: unknown, b: unknown): EnumSortCompareResult;
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
export declare function nullCompare(a: unknown, b: unknown): EnumSortCompareResult;
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
export declare function symbolCompare(a: unknown, b: unknown): EnumSortCompareResult;
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
export declare function dateCompare(a: Date, b: Date): number;
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
export declare function stringCompareLocale(a: string, b: string): number;
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
export declare function defaultCompareBasic(a: unknown, b: unknown): EnumSortCompareResult;
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
export declare function defaultCompareWithSymbol(a: unknown, b: unknown): EnumSortCompareResult;
/**
 * 使用 Symbol 支援對陣列進行排序
 * Sort array with Symbol support
 *
 * @param arr - 要排序的陣列 / Array to sort
 * @returns 排序後的陣列 / Sorted array
 */
export declare function arraySortWithSymbol<T extends any[]>(arr: T): T;

export {
	defaultCompareWithSymbol as default,
	defaultCompareWithSymbol as defaultCompare,
};

export {};
