import { nullCompare, numberCompare, symbolCompare } from './core';

export * from './util';
export * from './core';

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
export function defaultCompareBasic(a: unknown, b: unknown)
{
	const result = nullCompare(a, b);

	if (typeof result === 'number')
	{
		return result
	}

	return numberCompare(a, b)
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
export function defaultCompareWithSymbol(a: unknown, b: unknown)
{
	const result = nullCompare(a, b);

	if (typeof result === 'number')
	{
		return result
	}

	return symbolCompare(a, b)
}

/**
 * 使用 Symbol 支援對陣列進行排序
 * Sort array with Symbol support
 *
 * @param arr - 要排序的陣列 / Array to sort
 * @returns 排序後的陣列 / Sorted array
 */
export function arraySortWithSymbol<T extends any[]>(arr: T)
{
	return arr.sort(defaultCompareWithSymbol)
}

/**
 * 預設導出 / Default export
 * 支援 Symbol 的預設比較函式
 */
export { defaultCompareWithSymbol as defaultCompare }

export default defaultCompareWithSymbol
