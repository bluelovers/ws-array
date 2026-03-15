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
export declare function sortObjectKeys<T extends Record<any, any>>(object: T, sortFn: IOptions<T>["sort"]): T;
export declare function sortObjectKeys<T extends Record<any, any>>(object: T, keyOrders: IOptions<T>["keys"]): T;
export declare function sortObjectKeys<T extends Record<any, any>>(object: T, options?: Omit<IOptions<T>, "keys" | "onlyKeys"> & {
	keys: IOptions<T>["keys"];
	onlyKeys: true;
}): Partial<T>;
export declare function sortObjectKeys<T extends Record<any, any>>(object: T, options?: Omit<IOptions<T>, "useSource"> & {
	useSource: true;
}): T;
export declare function sortObjectKeys<T extends Record<any, any>>(object: T, options?: IOptions<T>): T;
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
export interface IOptions<T extends Record<any, any> = Record<any, any>, K extends string = Extract<keyof T, string>> {
	/**
	 * key order
	 */
	keys?: ITSArrayListMaybeReadonly<string | K>;
	/**
	 * return Object only keys
	 * will disable useSource
	 */
	onlyKeys?: boolean;
	/**
	 * sort callback
	 *
	 * @param a
	 * @param b
	 * @returns {any}
	 */
	sort?: (a: string | K, b: string | K) => number;
	/**
	 * return reversed Object
	 */
	desc?: boolean;
	allowNotExists?: boolean;
	/**
	 * return source Object
	 */
	useSource?: boolean;
}

export {
	sortObjectKeys as default,
	sortObjectKeys as sortObject,
};

export {};
