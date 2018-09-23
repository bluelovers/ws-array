/**
 * Created by user on 2018/5/30/030.
 */

import equals = require('deep-eql');

declare function lazy_unique<T extends any[]>(arr: T): T
declare function lazy_unique<T, T1, T2>(a1: T1, a2: T2, ...arr: T[]): Array<T | T1 | T2>
declare function lazy_unique<T>(...arr: Array<T | T[]>): T | (T | T[])[]
/*
function lazy_unique<T>(...arr: Array<T | T[]>)
{
	if (arr.length > 1)
	{
		return array_unique(arr);
	}

	return array_unique(arr[0]);
}
*/

module lazy_unique
{
	// @ts-ignore
	const equals = require('deep-eql');

	export function lazy_unique<T extends any[]>(arr: T): T
	export function lazy_unique<T, T1, T2>(a1: T1, a2: T2, ...arr: T[]): Array<T | T1 | T2>
	export function lazy_unique<T>(...arr: Array<T | T[]>): T | (T | T[])[]
	// @ts-ignore
	export function lazy_unique<T>(...arr: Array<T | T[]>)
	{
		if (arr.length > 1)
		{
			return array_unique(arr);
		}

		return array_unique(arr[0]);
	}

	export function array_unique<T>(arr: T, options: {

		checker?(element: T[keyof T], array: T[keyof T], arr_new?: T, arr_old?: T): boolean,
		checker?<R>(element: R[keyof R], array: R[keyof R], arr_new?: R, arr_old?: R): boolean,

		overwrite?: boolean,

		filter?(v: T[keyof T]): boolean,
		filter?<R>(v: R[keyof R]): boolean,

	} = {}): T
	{
		if (!Array.isArray(arr))
		{
			throw new TypeError(`Expected an Array but got ${typeof arr}.`)
		}

		const cb = defaultFilter(options);

		if (options.overwrite)
		{
			let index = arr.length;

			while (index--)
			{
				let val = arr[index];

				if (!cb(val, index, arr))
				{
					arr.splice(index, 1);
				}
			}

			return arr;
		}

		// @ts-ignore
		return arr.filter(cb);
	}

	export function lazy_unique_overwrite<T>(...arr: Array<T | T[]>)
	{
		if (arr.length > 1)
		{
			return array_unique_overwrite(arr);
		}

		return array_unique_overwrite(arr[0]);
	}

	export function array_unique_overwrite<T>(arr: T, options: IOptions<T> = {}): T
	{
		let opts = Object.assign({}, options, {
			overwrite: true,
		});

		return array_unique(arr, opts);
	}

	export type IOptions<T> = {

		checker?(element: T[keyof T], array: T[keyof T], arr_new?: T, arr_old?: T): boolean,
		checker?<R>(element: R[keyof R], array: R[keyof R], arr_new?: R, arr_old?: R): boolean,

		overwrite?: boolean,

		filter?(v: T[keyof T]): boolean,
		filter?<R>(v: R[keyof R]): boolean,
	};

	export function defaultFilter<T>(options: IOptions<T> = {})
	{
		const checker = options.checker || defaultChecker;
		const filter = options.filter || null;

		const cb = <K extends any[]>(val: K[keyof K], index: number, arr: K) =>
		{
			let i = arr.findIndex(a => checker(a, val, arr, arr));
			return i == index && (!filter || filter(val));
		};

		return cb;
	}

	export function defaultChecker<T, R>(element: T, value: R, arr_new?: Array<T | R>, arr_old?: Array<T | R>): boolean
	{
		return equals(element, value);
	}

	// @ts-ignore
	export declare function equals(a1, a2): boolean;

	// @ts-ignore
	export { lazy_unique as default };
}

import array_unique = lazy_unique.array_unique;

// @ts-ignore
lazy_unique = lazy_unique.lazy_unique = Object.assign(lazy_unique.lazy_unique, lazy_unique, exports, {
	// @ts-ignore
	equals: require('deep-eql'),
	default: lazy_unique.lazy_unique,
});

// @ts-ignore
export default lazy_unique;

// @ts-ignore
Object.defineProperty(lazy_unique, "__esModule", { value: true });

// @ts-ignore
Object.keys(lazy_unique).forEach((k) => {
	try
	{
		// @ts-ignore
		lazy_unique[k] = Object.freeze(lazy_unique[k]);
	}
	catch (e)
	{

	}
});

// @ts-ignore
lazy_unique = Object.freeze(lazy_unique);
// @ts-ignore
export = lazy_unique
//export = lazy_unique;
