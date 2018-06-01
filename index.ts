/**
 * Created by user on 2018/5/30/030.
 */

import equals = require('deep-eql');

export function lazy_unique<T extends any[]>(arr: T): T
export function lazy_unique<T, T1, T2>(a1: T1, a2: T2, ...arr: T[]): Array<T | T1 | T2>
export function lazy_unique<T>(...arr: Array<T | T[]>): T | (T | T[])[]
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

/**
 *
 * @param {T} element
 * @param {R} value
 * @param {Array<T | R>} arr_new
 * @param {Array<T | R>} arr_old
 * @returns {boolean}
 */
export function defaultChecker<T, R>(element: T, value: R, arr_new?: Array<T | R>, arr_old?: Array<T | R>): boolean
{
	return equals(element, value);
}

export default lazy_unique;
