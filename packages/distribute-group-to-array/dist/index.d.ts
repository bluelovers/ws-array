/**
 * 分發群組到陣列的選項介面
 * Options interface for distributing groups to array
 *
 * @property init - 初始化群組陣列的函式 / Function to initialize group array
 * @property groupArraySize - 群組陣列的大小 / Size of group array
 */
export interface IOptionsDistributeGroupToArray<T> {
	init?(): T[][];
	groupArraySize?: number;
}
/**
 * 建立指定長度的群組陣列
 * Create group array with specified length
 *
 * @param length - 群組數量 / Number of groups
 * @returns 指定數量的空陣列 / Array of specified number of empty arrays
 *
 * @example
 * _createGroupArray(4); // => [[], [], [], []]
 */
export declare function _createGroupArray<T, N extends number = 4>(length: N): T[][] & {
	readonly length: N;
};
/**
 * 將群組資料分發到多個陣列中
 * Distribute group data into multiple arrays
 *
 * 應用情境：
 * - 將分組資料均匀分發到多個處理佇列
 * - 负载均衡：將任務均匀分配到多個worker
 * - 資料分頁：將資料分發到多個頁面
 * - Distribute grouped data evenly across multiple processing queues
 * - Load balancing: Distribute tasks evenly across multiple workers
 * - Data pagination: Distribute data across multiple pages
 *
 * @param group - 群組資料（Record 或 Map）/ Group data (Record or Map)
 * @param options - 分發選項 / Distribution options
 * @returns 分發後的群組陣列 / Distributed group arrays
 *
 * @example
 * // 將兩個群組的資料交替分發
 * distributeGroupToArrayCore({
 *   groupA: ['a1', 'a2', 'a3'],
 *   groupB: ['b1', 'b2']
 * });
 * // => [['a1', 'b1', 'a3'], ['a2', 'b2']]
 */
export declare function distributeGroupToArrayCore<T>(group: Record<string, T[]> | Map<any, T[]>, options?: IOptionsDistributeGroupToArray<T>): T[][];
/**
 * 將 Map 轉換為 Record
 * Convert Map to Record
 *
 * @param map - 要轉換的 Map / Map to convert
 * @returns 轉換後的 Record / Converted Record
 *
 * @example
 * const map = new Map([['a', [1, 2]], ['b', [3, 4]]]);
 * mapToRecord(map); // => { a: [1, 2], b: [3, 4] }
 */
export declare function mapToRecord<T>(map: Map<any, T[]>): Record<string, T[]>;
/**
 * 將群組資料分發並扁平化為單一陣列
 * Distribute group data and flatten into single array
 *
 * 應用情境：
 * - 產生均匀分布的單一資料序列
 * - Generate evenly distributed single data sequence
 *
 * @param group - 群組資料（Record 或 Map）/ Group data (Record or Map)
 * @param options - 分發選項 / Distribution options
 * @returns 扁平化的分發結果 / Flattened distributed result
 *
 * @example
 * distributeGroupToArray({
 *   groupA: ['a1', 'a2', 'a3'],
 *   groupB: ['b1', 'b2']
 * });
 * // => ['a1', 'b1', 'a2', 'b2', 'a3']
 */
export declare function distributeGroupToArray<T>(group: Record<string, T[]> | Map<any, T[]>, options?: IOptionsDistributeGroupToArray<T>): T[];

export {
	distributeGroupToArray as default,
};

export {};
