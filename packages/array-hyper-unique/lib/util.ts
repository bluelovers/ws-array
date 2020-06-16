
import _equals from 'deep-eql';
import { IOptions } from './types';

export function equals<T>(a1: T, a2: T): boolean
export function equals<T>(a1: T, a2: unknown): a2 is T
export function equals<T>(a1: unknown, a2: T): a1 is T
export function equals(a1, a2): boolean
{
	return _equals(a1, a2)
}

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
	return _equals(element, value);
}
