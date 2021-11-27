export interface IOptionsDistributeGroupToArray<T>
{
	init?(): T[][],
	groupArraySize?: number,
}

export function _createGroupArray<T, N extends number = 4>(length: N): T[][] & {
	readonly length: N
}
{
	const arr: T[][] = [];

	for (let i = 0; i < length; i++)
	{
		arr.push([]);
	}

	return arr as any;
}

export function distributeGroupToArrayCore<T>(group: Record<string, T[]> | Map<any, T[]>,
	options?: IOptionsDistributeGroupToArray<T>,
)
{
	// @ts-ignore
	if (typeof group.entries !== 'undefined')
	{
		group = mapToRecord(group as any);
	}

	// @ts-ignore
	const arr = options?.init?.() ?? _createGroupArray<T>(options?.groupArraySize ?? 4);

	const len = arr.length;

	const { names, record } = Object.entries(group).reduce((a, [k, v]) =>
	{

		a.names.push(k);
		a.record[k] = v.slice();

		return a
	}, {
		names: [] as string[],
		record: {} as Record<string, T[]>,
	});

	let i = len - 1;

	do
	{
		let item: T;

		for (let name of names)
		{
			item = record[name]?.pop();

			if (item)
			{
				arr[i % len].push(item);
			}
			else
			{
				delete record[name]
			}
		}

		if (item)
		{
			i++;
		}

	}
	while (Object.keys(record).length)

	return arr
}

export function mapToRecord<T>(map: Map<any, T[]>)
{
	const record = {} as Record<string, T[]>;

	for (let [k, v] of map.entries())
	{
		record[k] = v;
	}

	return record
}

export function distributeGroupToArray<T>(group: Record<string, T[]> | Map<any, T[]>,
	options?: IOptionsDistributeGroupToArray<T>,
)
{
	return distributeGroupToArrayCore<T>(group as any, options).flat()
}

export default distributeGroupToArray
