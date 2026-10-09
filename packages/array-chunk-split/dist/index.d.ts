/**
 * Makes the selected properties of a type required.
 *
 * This is the standard version and is intended for a single object type.
 *
 * @example
 * type User = {
 *   name?: string;
 *   age?: number;
 * };
 *
 * type Result = ITSRequiredPick<User, "name">;
 * // {
 * //   name: string;
 * //   age?: number;
 * // }
 */
export type ITSRequiredPick<T, K extends keyof T = keyof T> = {
	[P in K]-?: T[P];
};
/**
 * Makes the selected properties of a type optional.
 *
 * This is the standard version and is intended for a single object type.
 *
 * @example
 * type User = {
 *   name: string;
 *   age: number;
 * };
 *
 * type Result = ITSPartialPick<User, "name">;
 * // {
 * //   name?: string;
 * // }
 */
export type ITSPartialPick<T, K extends keyof T = keyof T> = {
	[P in K]?: T[P];
};
/**
 * 確保物件至少具有指定的鍵集合中的一個
 * Ensure the object has at least one of the specified key sets
 *
 * @see https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
 *
 * @example
 * interface User { name?: string; age?: number; }
 * type AtLeastOne = ITSRequireAtLeastOne<User, 'name' | 'age'>;
 * // 需要至少提供 name 或 age 其中一個
 */
export type ITSRequireAtLeastOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> & {
	[K in Keys]-?: ITSRequiredPick<T, K> & ITSPartialPick<T, Exclude<Keys, K>>;
}[Keys];
/**
 * 值或陣列：單一值或其陣列
 * Value or array: single value or array of that value
 *
 * @example
 * type StringOrArray = ITSValueOrArray<string>;
 * // type StringOrArray = string | string[]
 */
export type ITSValueOrArray<T> = T | T[];
/**
 * 分塊陣列的型別定義
 * Type definition for chunked array
 *
 * 相當於 T[][]
 * Equivalent to T[][]
 */
export interface IChunkArray<T> extends Array<T[]> {
}
/**
 * 映射回調函式介面
 * Map callback function interface
 *
 * @template T - 元素類型 / Element type
 * @template R - 回傳類型 / Return type
 */
export interface IMapCallback<T, R = T> {
	(value: T[], index: number, array: IChunkArray<T>): R;
	(value: T[], index: number, array: IChunkArray<T>): T;
}
/**
 * 陣列分塊選項
 * Array chunking options
 *
 * @property inputArray - 來源陣列 / Source array
 * @property maxChunkLength - 每個區塊的最大長度 / Maximum length per chunk
 * @property maxChunkSize - 每個區塊的最大大小 / Maximum size per chunk
 */
export type IOptions<T> = {
	/**
	 * source array
	 */
	inputArray: T[];
} & ITSRequireAtLeastOne<{
	/**
	 * Split an array into arrays with max chunk length
	 * 將陣列分割成最大長度的區塊
	 */
	maxChunkLength?: number;
	/**
	 * Split an array into arrays of chunk with max size
	 * 將陣列分割成最大大小的區塊
	 */
	maxChunkSize?: number;
}, "maxChunkLength" | "maxChunkSize">;
/**
 * 對分塊後的陣列進行映射轉換
 * Map over chunked arrays with transformation
 *
 * 應用情境：
 * - 分塊處理大型資料集
 * - 批次 API 請求
 * - 將連續資料分割後進行平行處理
 * - Process large datasets in chunks
 * - Batch API requests
 * - Split continuous data for parallel processing
 *
 * @param options - 分塊選項 / Chunking options
 * @returns 映射後的結果陣列 / Mapped result array
 *
 * @example
 * // 預設返回每個區塊的第一個元素
 * arrayChunkMap({
 *   inputArray: [1, 2, 3, 4, 5, 6, 7, 8],
 *   maxChunkLength: 4
 * }); // => [1, 3, 5, 7]
 *
 * // 返回每個區塊的最後一個元素
 * arrayChunkMap({
 *   inputArray: [1, 2, 3, 4, 5, 6, 7, 8],
 *   maxChunkLength: 4,
 *   mapMethod: true
 * }); // => [2, 4, 6, 8]
 *
 * // 自訂映射函式
 * arrayChunkMap({
 *   inputArray: [1, 2, 3, 4, 5, 6],
 *   maxChunkSize: 2,
 *   mapMethod: (chunk) => chunk.reduce((a, b) => a + b, 0)
 * }); // => [3, 7, 11]
 */
export declare function arrayChunkMap<T, R = T>(options: IOptions<T> & {
	mapMethod: IMapCallback<T, R>;
}): R[];
/**
 * by default will return a array with first value in chunk
 *
 * if mapMethod = true will return last value of chunk
 *
 * if give mapMethod is function
 * will calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export declare function arrayChunkMap<T>(options: IOptions<T> & {
	mapMethod: boolean;
}): T[];
/**
 * by default will return a array with first value in chunk
 *
 * if mapMethod = true will return last value of chunk
 *
 * if give mapMethod is function
 * will calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export declare function arrayChunkMap<T, R = T>(options: IOptions<T> & {
	mapMethod?: boolean | IMapCallback<T, R>;
}): R[];
/**
 * 根據區塊大小分割陣列
 * Split array into chunks by size
 *
 * 應用情境：
 * - 固定大小的資料批次
 * - 每 N 個元素一組的處理
 * - Fixed-size data batches
 * - Process every N elements as a group
 *
 * @param arr - 要分割的陣列 / Array to split
 * @param maxChunkSize - 每個區塊的大小 / Size of each chunk
 * @returns 分塊後的陣列 / Chunked array
 *
 * @example
 * // 固定區塊大小
 * arrayChunkBySize([1, 2, 3, 4, 5, 6, 7, 8], 5); // => [[1, 2, 3, 4, 5], [6, 7, 8]]
 *
 * // 多個區塊大小
 * arrayChunkBySize([1, 2, 3, 4, 5], [2, 3]); // => [[1, 2], [3, 4, 5]]
 */
export declare function arrayChunkBySize<T>(arr: T[], maxChunkSize: ITSValueOrArray<number>): IChunkArray<T>;
/**
 * 根據區塊數量分割陣列
 * Split array into specified number of chunks
 *
 * 應用情境：
 * - 均分資料到 N 個處理器
 * - 將資料均勻分配到多個頁面
 * - Distribute data evenly to N processors
 * - Distribute data evenly across multiple pages
 *
 * @param arr - 要分割的陣列 / Array to split
 * @param maxChunkLength - 區塊數量 / Number of chunks
 * @returns 分塊後的陣列 / Chunked array
 *
 * @example
 * // 分成 4 個區塊
 * arrayChunkSplit([1, 2, 3, 4, 5, 6, 7, 8], 4); // => [[1, 2], [3, 4], [5, 6], [7, 8]]
 *
 * // 分成 3 個區塊
 * arrayChunkSplit([1, 2, 3, 4, 5], 3); // => [[1, 2], [3, 4], [5]]
 */
export declare function arrayChunkSplit<T>(arr: T[], maxChunkLength: number): IChunkArray<T>;

export {
	arrayChunkSplit as default,
};

export {};
