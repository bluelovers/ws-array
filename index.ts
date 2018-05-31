/**
 * Created by user on 2018/5/30/030.
 */

import equals = require('deep-eql');

export function lazy_unique<T>(...arr: Array<T | T[]>)
{
	if (arr.length == 0 || arr.length == 1 && !Array.isArray(arr[0]))
	{
		throw new TypeError(`Expected an Array but got ${typeof arr[0]}.`)
	}
	else if (arr.length == 1)
	{
		return array_unique(arr[0]);
	}

	return array_unique(arr);
}

export function array_unique<T>(arr: T, options: {

	checker?(element: T[keyof T], array: T[keyof T], arr_new: T, arr_old: T): boolean,
	checker?<R>(element: R[keyof R], array: R[keyof R], arr_new: R, arr_old: R): boolean,

	overwrite?: boolean,
} = {}): T
{
	if (!Array.isArray(arr))
	{
		throw new TypeError(`Expected an Array but got ${typeof arr}.`)
	}

	let checker = options.checker || defaultChecker;

	if (options.overwrite)
	{
		let index = 0;

		while (index in arr)
		{
			let val = arr[index];

			let i = arr.findIndex(a => checker(a, val, arr, arr));

			if (i != index)
			{
				let j = Math.max(index, i);

				arr.splice(j, 1);
			}
			else
			{
				index++;
			}
		}

		return arr;
	}

	return arr.reduce((acc, val) =>
	{
		// @ts-ignore
		let i = acc.findIndex(a => checker(a, val, acc, arr));

		if (i == -1)
		{
			acc.push(val);
		}

		return acc
	}, []);
}

export function defaultChecker<T, R>(element: T, value: R, arr_new: Array<T | R>, arr_old: Array<T | R>): boolean
{
	return equals(element, value);
}

export default lazy_unique;
