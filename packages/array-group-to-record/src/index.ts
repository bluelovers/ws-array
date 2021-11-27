import hashSum from 'hash-sum';

export interface IOptionsForRecord<T>
{
	getKey?(item: T, index: number, arr: T[]): string

	init?(): Record<string, T[]>,
}

export interface IOptionsForMap<T>
{
	getKey?(item: T, index: number, arr: T[]): any

	init?(): Map<any, T[]>,
}

export function handleOptions<O extends IOptionsForRecord<any> | IOptionsForMap<any>>(options: O): O
{
	const getKey = options?.getKey ?? ((item) => hashSum(item));

	return {
		...options,
		getKey,
	}
}

export function arrayGroupToRecord<T>(arr: T[], options?: IOptionsForRecord<T>)
{
	const { getKey, init } = handleOptions(options);

	return arr.reduce((map, item, index, arr) =>
	{

		const id = getKey(item, index, arr);

		map[id] ??= [];
		map[id].push(item);

		return map
	}, init?.() ?? {} as Record<string, T[]>);
}

export function arrayGroupToMap<T>(arr: T[], options?: IOptionsForMap<T>)
{
	const { getKey, init } = handleOptions(options);

	return arr.reduce((map, item, index, arr) =>
	{

		const id = getKey(item, index, arr);

		const a = map.get(id) ?? [];

		a.push(item);

		map.set(id, a);

		return map
	}, init?.() ?? new Map() as Map<any, T[]>);
}

export function sumGroup<T extends Record<any, any[]> | Map<any, any[]>>(group: T)
{
	let len = 0;

	if (typeof group.forEach === 'undefined')
	{
		// @ts-ignore
		group = Object.values(group);
	}

	// @ts-ignore
	group.forEach(b => len += b.length);

	return len;
}

export default arrayGroupToRecord
