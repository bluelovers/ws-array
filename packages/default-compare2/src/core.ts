import { _typeOf } from './util';

/**
 * 排序比較結果枚舉
 * Sort compare result enum
 *
 * @property KEEP - 保持原位 / Keep position
 * @property RIGHT - 排在右邊（較大）/ Place on right (greater)
 * @property LEFT - 排在左邊（較小）/ Place on left (smaller)
 */
export const enum EnumSortCompareResult
{
	KEEP = 0,
	RIGHT = 1,
	LEFT = -1,
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
export function numberCompare(a: unknown, b: unknown)
{
	if (a < b)
	{
		return EnumSortCompareResult.LEFT
	}
	else if (a > b)
	{
		return EnumSortCompareResult.RIGHT
	}

	return EnumSortCompareResult.KEEP
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
export function nullCompare(a: unknown, b: unknown)
{
	const typeA = _typeOf(a);
	const typeB = _typeOf(b);

	if (typeA === 'null')
	{
		return typeB === 'null' ? EnumSortCompareResult.KEEP : (typeB === 'undefined'
			? EnumSortCompareResult.LEFT
			: EnumSortCompareResult.RIGHT);
	}
	else if (typeA === 'undefined')
	{
		return typeB === 'null' ? EnumSortCompareResult.RIGHT : (typeB === 'undefined'
			? EnumSortCompareResult.KEEP
			: EnumSortCompareResult.RIGHT);
	}
	else if (typeB === 'null' || typeB === 'undefined')
	{
		return EnumSortCompareResult.LEFT;
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
export function symbolCompare(a: unknown, b: unknown)
{
	const typeA = _typeOf(a);
	const typeB = _typeOf(b);

	if (typeA === 'symbol')
	{
		return typeB === 'symbol' ? numberCompare(String(a), String(b)) : EnumSortCompareResult.LEFT
	}
	else if (typeB === 'symbol')
	{
		return EnumSortCompareResult.RIGHT
	}

	return numberCompare(a, b)
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
export function dateCompare(a: Date, b: Date)
{
	return a.getTime() - b.getTime()
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
export function stringCompareLocale(a: string, b: string)
{
	return a.localeCompare(b)
}
