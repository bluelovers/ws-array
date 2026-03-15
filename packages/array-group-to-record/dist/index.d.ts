/**
 * 將陣列元素分組為 Record 的選項
 * Options for grouping array elements into Record
 *
 * @property getKey - 取得分組鍵的函式 / Function to get grouping key
 * @property init - 初始化 Record 的函式 / Function to initialize Record
 */
export interface IOptionsForRecord<T> {
	getKey?(item: T, index: number, arr: T[]): string;
	init?(): Record<string, T[]>;
}
/**
 * 將陣列元素分組為 Map 的選項
 * Options for grouping array elements into Map
 */
export interface IOptionsForMap<T> {
	/**
	 * 取得分組鍵的函式 / Function to get grouping key
	 *
	 * @param item - 要分組的元素 / Element to group
	 * @param index - 元素在陣列中的索引 / Index of element in array
	 * @param arr - 陣列本身 / Array itself
	 */
	getKey?(item: T, index: number, arr: T[]): any;
	/** 初始化 Map 的函式 / Function to initialize Map */
	init?(): Map<any, T[]>;
}
/**
 * 處理選項，回填預設值
 * Handle options, fill in defaults
 *
 * 應用情境：
 * - 當未提供 getKey 時，使用 hash-sum 作為預設鍵生成函式
 * - When getKey is not provided, use hash-sum as default key generator
 *
 * @param options - 輸入選項 / Input options
 * @returns 處理後的選項 / Processed options
 */
export declare function handleOptions<O extends IOptionsForRecord<any> | IOptionsForMap<any>>(options: O): O;
/**
 * 將陣列分組為 Record
 * Group array elements into Record
 *
 * 應用情境：
 * - 根據物件屬性將陣列分組
 * - 實現類似 SQL 的 GROUP BY 功能
 * - 統計分類數量
 * - Group array by object properties
 * - Implement SQL-like GROUP BY functionality
 * - Count categories
 *
 * @param arr - 要分組的陣列 / Array to group
 * @param options - 分組選項 / Grouping options
 * @returns 分組後的 Record / Grouped Record
 *
 * @example
 * // 基本使用
 * arrayGroupToRecord(['a', 'b', 'ab', 'abc'], {
 *   getKey: (item) => item.length
 * });
 * // => { '1': ['a', 'b'], '2': ['ab'], '3': ['abc'] }
 *
 * // 物件分組
 * arrayGroupToRecord([
 *   { type: 'fruit', name: 'apple' },
 *   { type: 'fruit', name: 'banana' },
 *   { type: 'veg', name: 'carrot' }
 * ], {
 *   getKey: (item) => item.type
 * });
 * // => { fruit: [...], veg: [...] }
 */
export declare function arrayGroupToRecord<T>(arr: T[], options?: IOptionsForRecord<T>): Record<string, T[]>;
/**
 * 將陣列分組為 Map
 * Group array elements into Map
 *
 * 應用情境：
 * - 需要使用 Map API 的場景
 * - 保持插入順序
 * - Need to use Map API scenarios
 * - Maintain insertion order
 *
 * @param arr - 要分組的陣列 / Array to group
 * @param options - 分組選項 / Grouping options
 * @returns 分組後的 Map / Grouped Map
 *
 * @example
 * arrayGroupToMap([1, 2, 3, 4, 5], {
 *   getKey: (item) => item % 2 === 0 ? 'even' : 'odd'
 * });
 * // => Map { 'odd' => [1, 3, 5], 'even' => [2, 4] }
 */
export declare function arrayGroupToMap<T>(arr: T[], options?: IOptionsForMap<T>): Map<any, T[]>;
/**
 * 計算分組後的總元素數量
 * Calculate total element count after grouping
 *
 * 應用情境：
 * - 計算分組後的總數
 * - 驗證資料完整性
 * - Calculate total after grouping
 * - Verify data integrity
 *
 * @param group - 分組資料（Record 或 Map）/ Grouped data (Record or Map)
 * @returns 總元素數量 / Total element count
 *
 * @example
 * sumGroup({ a: [1, 2], b: [3, 4, 5] }); // => 5
 * sumGroup(new Map([['a', [1, 2]], ['b', [3, 4, 5]]])); // => 5
 */
export declare function sumGroup<T extends Record<any, any[]> | Map<any, any[]>>(group: T): number;

export {
	arrayGroupToRecord as default,
};

export {};
