import { _typeOf } from './util';

export const enum EnumSortCompareResult
{
	KEEP = 0,
	RIGHT = 1,
	LEFT = -1,
}

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
 * will return undefined when a and b not null/undefined
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

export function dateCompare(a: Date, b: Date)
{
	return a.getTime() - b.getTime()
}

export function stringCompareLocale(a: string, b: string)
{
	return a.localeCompare(b)
}
