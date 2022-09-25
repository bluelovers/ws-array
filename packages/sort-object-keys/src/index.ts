import { array_unique_indexOf } from '@lazy-array/util-unique';

export function sortObjectKeys<T extends Record<any, any>>(object: T, sortFn: IOptions<T>["sort"]): T
export function sortObjectKeys<T extends Record<any, any>>(object: T, keyOrders: IOptions<T>["keys"]): T
export function sortObjectKeys<T extends Record<any, any>>(object: T, options?: Omit<IOptions<T>, 'keys' | 'onlyKeys'> & {
	keys: IOptions<T>["keys"],
	onlyKeys: true,
}): Partial<T>
export function sortObjectKeys<T extends Record<any, any>>(object: T, options?: Omit<IOptions<T>, 'useSource'> & {
	useSource: true,
}): T
export function sortObjectKeys<T extends Record<any, any>>(object: T, options?: IOptions<T>): T
export function sortObjectKeys<T extends Record<any, any>>(object: T, sortWith: unknown): T | Partial<T>
{
	let options: IOptions<T> = {};

	if (typeof sortWith === 'function')
	{
		options.sort = sortWith as IOptions<T>["sort"];
	}
	else if (Array.isArray(sortWith))
	{
		options.keys = sortWith;
	}
	else
	{
		options = Object.assign(options, sortWith);
	}

	let {
		keys = [] as IOptions<T>["keys"],
		useSource,
	} = options;

	if (options.onlyKeys)
	{
		useSource = false;

		if (typeof keys.length !== 'number' || keys.length === 0)
		{
			throw new ReferenceError(`options.key is empty or not exists.`)
		}
	}
	else
	{
		keys = keys.concat()
			.concat(Object.keys(object).sort(options.sort))
		;
	}

	keys = array_unique_indexOf(keys);

	if (options.desc)
	{
		keys = keys.reverse()
	}

	let ret = keys.reduce(function (total, key)
	{
		if (options.allowNotExists || key in object)
		{
			total[key] = object[key];
		}

		return total;
	}, {} as Partial<T>);

	if (useSource)
	{
		(Object.keys(ret) as IOptions<T>["keys"])
			.forEach(function (key)
			{
				delete object[key];
				object[key] = ret[key];
			})
		;

		return object;
	}

	return ret;
}

export interface IOptions<T extends Record<any, any> = Record<any, any> , K extends string = Extract<keyof T, string>>
{
	/**
	 * key order
	 */
	keys?: (string | K)[],
	/**
	 * return Object only keys
	 * will disable useSource
	 */
	onlyKeys?: boolean,
	/**
	 * sort callback
	 *
	 * @param a
	 * @param b
	 * @returns {any}
	 */
	sort?: (a: string | K, b: string | K) => number,
	/**
	 * return reversed Object
	 */
	desc?: boolean,
	allowNotExists?: boolean,
	/**
	 * return source Object
	 */
	useSource?: boolean,
}

export { sortObjectKeys as sortObject }

Object.defineProperty(sortObjectKeys, 'sortObjectKeys', { value: sortObjectKeys });
Object.defineProperty(sortObjectKeys, 'sortObject', { value: sortObjectKeys });
Object.defineProperty(sortObjectKeys, 'default', { value: sortObjectKeys });

export default sortObjectKeys;
