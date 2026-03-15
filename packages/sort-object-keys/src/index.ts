import { array_unique_indexOf } from '@lazy-array/util-unique';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 對物件的鍵進行排序並返回新物件
 * Sort object keys and return a new object
 *
 * 應用情境：
 * - 確保物件鍵順序一致，便於測試和比對
 * - 自訂鍵的排列順序
 * - 產生穩定的物件結構用於序列化
 * - Ensure consistent object key order for testing and comparison
 * - Custom key ordering
 * - Generate stable object structure for serialization
 *
 * @param object - 要排序的物件 / Object to sort
 * @param sortWith - 排序方式：自訂函式、鍵陣列或選項物件 / Sort method: custom function, key array, or options object
 * @returns 排序後的新物件 / Sorted new object
 *
 * @example
 * // 基本排序
 * sortObjectKeys({ c: 1, b: 2, a: 3 }); // => { a: 3, b: 2, c: 1 }
 *
 * // 自訂鍵順序
 * sortObjectKeys({ c: 1, b: 2, a: 3 }, ['b', 'a', 'c']); // => { b: 2, a: 3, c: 1 }
 *
 * // 自訂排序函式
 * sortObjectKeys({ key2: 1, key10: 1, key1: 1 }, (a, b) => {
 *   return a.localeCompare(b, undefined, { numeric: true });
 * }); // => { key1: 1, key2: 1, key10: 1 }
 */
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
		keys = [],
		useSource,
	} = options as {
		keys: any[],
		useSource: boolean,
	};

	if (Array.isArray(keys))
	{
		keys = keys.slice();
	}

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
		keys = keys
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

/**
 * 排序物件鍵的選項介面
 * Options interface for sorting object keys
 *
 * @property keys - 指定鍵的順序 / Key order
 * @property onlyKeys - 只返回指定的鍵 / Return only specified keys
 * @property sort - 自訂排序函式 / Custom sort function
 * @property desc - 降序排列 / Sort in descending order
 * @property allowNotExists - 允許返回不存在的鍵 / Allow returning non-existent keys
 * @property useSource - 直接修改原物件 / Modify source object directly
 */
export interface IOptions<T extends Record<any, any> = Record<any, any> , K extends string = Extract<keyof T, string>>
{
	/**
	 * key order
	 */
	keys?: ITSArrayListMaybeReadonly<string | K>,
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

if (process.env.TSDX_FORMAT !== 'esm')
{

	Object.defineProperty(sortObjectKeys, 'sortObjectKeys', { value: sortObjectKeys });
	Object.defineProperty(sortObjectKeys, 'sortObject', { value: sortObjectKeys });
	Object.defineProperty(sortObjectKeys, 'default', { value: sortObjectKeys });
	Object.defineProperty(sortObjectKeys, "__esModule", { value: true });

}

export default sortObjectKeys;
