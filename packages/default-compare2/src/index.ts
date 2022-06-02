import { nullCompare, numberCompare, symbolCompare } from './core';

export * from './util';
export * from './core';

export function defaultCompareBasic(a: unknown, b: unknown)
{
	const result = nullCompare(a, b);

	if (typeof result === 'number')
	{
		return result
	}

	return numberCompare(a, b)
}

export function defaultCompareWithSymbol(a: unknown, b: unknown)
{
	const result = nullCompare(a, b);

	if (typeof result === 'number')
	{
		return result
	}

	return symbolCompare(a, b)
}

export function arraySortWithSymbol<T extends any[]>(arr: T)
{
	return arr.sort(defaultCompareWithSymbol)
}

export { defaultCompareWithSymbol as defaultCompare }

export default defaultCompareWithSymbol
