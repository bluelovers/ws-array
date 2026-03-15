
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
export function _typeOf(target: unknown)
{
	if (target === null)
	{
		return 'null' as const
	}

	return typeof target
}
