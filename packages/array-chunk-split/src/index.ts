import { ITSRequireAtLeastOne } from 'ts-type/lib/type/record';

/**
 * same as T[][]
 */
export interface IChunkArray<T> extends Array<T[]>
{

}

/**
 * will calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export interface IMapCallback<T, R = T>
{
	(value: T[], index: number, array: IChunkArray<T>): R

	(value: T[], index: number, array: IChunkArray<T>): T
}

export type IOptions<T> = {

	/**
	 * source array
	 */
	inputArray: T[],

} & ITSRequireAtLeastOne<{

	/**
	 * Split an array into arrays with max chunk length
	 */
	maxChunkLength?: number,
	/**
	 * Split an array into arrays of chunk with max size
	 */
	maxChunkSize?: number,

}, 'maxChunkLength' | 'maxChunkSize'>;

/**
 * by default will return a array with first value in chunk
 *
 * if mapMethod = true will return last value of chunk
 *
 * if give mapMethod is function
 * will calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export function arrayChunkMap<T, R = T>(options: IOptions<T> & {
	mapMethod: IMapCallback<T, R>
}): R[]
/**
 * by default will return a array with first value in chunk
 *
 * if mapMethod = true will return last value of chunk
 *
 * if give mapMethod is function
 * will calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export function arrayChunkMap<T>(options: IOptions<T> & {
	mapMethod: boolean
}): T[]
/**
 * by default will return a array with first value in chunk
 *
 * if mapMethod = true will return last value of chunk
 *
 * if give mapMethod is function
 * will calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export function arrayChunkMap<T, R = T>(options: IOptions<T> & {
	mapMethod?: boolean | IMapCallback<T, R>
}): R[]
export function arrayChunkMap<T, R = T>(options: IOptions<T> & {
	mapMethod?: boolean | IMapCallback<T, R>
}): R[]
{
	const { inputArray, maxChunkLength, maxChunkSize } = options;
	let { mapMethod } = options;

	let result: IChunkArray<T>;

	if (maxChunkLength != null)
	{
		result = arrayChunkSplit(inputArray, maxChunkLength);
	}
	else if (maxChunkSize != null)
	{
		result = arrayChunkBySize(inputArray, maxChunkSize);
	}
	else
	{
		throw new TypeError(`maxChunkLength or maxChunkSize is required`)
	}

	if (typeof mapMethod !== 'function')
	{
		if (mapMethod)
		{
			// @ts-ignore
			mapMethod = (value) => value[value.length - 1];
		}
		else
		{
			// @ts-ignore
			mapMethod = (value) => value[0];
		}
	}

	return result.map(mapMethod as any) as any as R[];
}

/**
 * Split an array into arrays of chunk with max size
 *
 * @example arrayChunkBySize([1, 2, 3, 4, 5, 6, 7, 8], 5); // => [[1, 2, 3, 4, 5], [6, 7, 8]]
 */
export function arrayChunkBySize<T>(arr: T[], maxChunkSize: number): IChunkArray<T>
{
	const result: IChunkArray<T> = [];
	//let part: T[] = [];

	const { length } = arr;

	if (typeof maxChunkSize !== 'number' || maxChunkSize < 1)
	{
		throw new RangeError(`expected maxChunkSize > 0 but got ${maxChunkSize}`)
	}

	for (let i = 0; i < length; i++)
	{
		let next = i + maxChunkSize;

		result.push(arr.slice(i, next));

		i = next - 1;
	}

	return result;
}

/**
 * Split an array into arrays with max chunk length
 *
 * @example arrayChunkSplit([1, 2, 3, 4, 5, 6, 7, 8], 4); // => [[1, 2], [3, 4], [5, 6], [7, 8]]
 */
export function arrayChunkSplit<T>(arr: T[], maxChunkLength: number)
{
	if (typeof maxChunkLength !== 'number' || maxChunkLength < 1)
	{
		throw new RangeError(`expected maxChunkLength > 0 but got ${maxChunkLength}`)
	}

	const maxChunkSize = Math.max(Math.round(arr.length / maxChunkLength), 1);
	return arrayChunkBySize(arr, maxChunkSize);
}

export default arrayChunkSplit
