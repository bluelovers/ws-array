/**
 * Created by user on 2019/7/19.
 */

export interface IMapCallback<T, R = T>
{
	(value: T[], index: number, array: T[][]): R
}

export function arrayChunkMap<T, R = T>(options: {
	arr: T[],
	chunkLength: number,

	popMethod?: boolean | IMapCallback<T, R>
})
{
	const { arr, chunkLength } = options;
	let { popMethod } = options;

	const result = arrayChunkSplit(arr, chunkLength);

	if (typeof popMethod != 'function')
	{
		if (popMethod)
		{
			popMethod = ((value) => value[value.length - 1]) as any as IMapCallback<T, R>
		}
		else
		{
			popMethod = ((value) => value[0]) as any as IMapCallback<T, R>
		}
	}

	return result.map(popMethod);
}

export function arrayChunkBySize<T>(arr: T[], maxLength: number)
{
	const result: T[][] = [];
	let part: T[] = [];

	const { length } = arr;

	for (let i = 0; i < length; i++) {

		let next = i + maxLength;

		result.push(arr.slice(i, next));

		i = next - 1;

		/*
		part.push(arr[i]);
		if (part.length === maxLength || i === length - 1) {
			result.push(part);
			part = [];
		}
		 */
	}

	return result;
}

export function arrayChunkSplit<T>(arr: T[], maxChunkLength: number)
{
	const maxLength = Math.max(Math.round(arr.length / maxChunkLength), 1);
	return arrayChunkBySize(arr, maxLength);
}