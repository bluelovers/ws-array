/**
 * Created by user on 2020/6/4.
 */

// @ts-ignore
import _naturalCompare from 'string-natural-compare';

export interface IOptionsStringNaturalCompare
{
	/**
	 * Set to true to compare strings case-insensitively. Default: false.
	 */
	caseInsensitive?: boolean,
	/**
	 * A string of characters that define a custom character ordering. Default: undefined.
	 */
	alphabet?: string,
}

export interface IOptionsNaturalCompare extends IOptionsStringNaturalCompare
{
	desc?: boolean,
}

/**
 * Compare alphanumeric strings the same way a human would,
 * using a natural order algorithm
 * (originally known as the alphanum algorithm)
 * where numeric characters are sorted
 * based on their numeric values rather than their ASCII values.
 */
export function naturalCompare(a: string | number, b: string | number, opts?: IOptionsNaturalCompare)
{
	let i: number;

	if (typeof a === 'number' && typeof b === 'number')
	{
		i = a - b
	}
	else
	{
		if (typeof a === 'number')
		{
			a = String(a);
		}
		else if (typeof b === 'number')
		{
			b = String(b);
		}

		if (a === b)
		{
			return 0
		}

		i = _naturalCompare(a, b, opts)
	}

	if (i !== 0 && opts?.desc)
	{
		i = 0 - i;
	}

	return i
}

/**
 * create compare with preset options
 */
export function createNew(opts?: IOptionsNaturalCompare)
{
	return (a: string | number, b: string | number) => naturalCompare(a, b, opts)
}

/**
 * compare strings case-insensitively
 */
export const compareCaseInsensitive = createNew({
	caseInsensitive: true,
})

export { compareCaseInsensitive as caseInsensitive }

naturalCompare.createNew = createNew;
naturalCompare.compareCaseInsensitive = compareCaseInsensitive;
naturalCompare.caseInsensitive = compareCaseInsensitive;
naturalCompare.default = naturalCompare;

Object.defineProperty(naturalCompare, "__esModule", { value: true });

export default naturalCompare
