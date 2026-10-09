/**
 * 取得 Tuple 類型的所有元素（除了最後一個）
 * Get all elements of a Tuple type except the last one
 *
 * @example
 * type T = ITSValueOfTuple<readonly [1, 2, 3]>; // => [1, 2]
 */
export type ITSValueOfTuple<T extends readonly any[]> = T extends readonly [
	...infer U
] ? U : never;
/**
 * 使用 indexOf 過濾陣列取得唯一值
 * Get unique values from array using indexOf filter
 *
 * 應用情境：
 * - 當需要保留陣列中相同值的第一個出現位置時
 * - 適用於簡單資料類型的去重（如字串、數字）
 * - When you need to keep the first occurrence of each value
 * - Suitable for simple data types (strings, numbers)
 *
 * @param arr - 要去重的陣列 / Array to deduplicate
 * @returns 去重後的陣列 / Deduplicated array
 *
 * @example
 * array_unique_indexOf([1, 2, 2, 3]); // => [1, 2, 3]
 * array_unique_indexOf(['a', 'b', 'a']); // => ['a', 'b']
 */
export declare function array_unique_indexOf<T extends readonly any[]>(arr: T): ITSValueOfTuple<T>;
/**
 * 使用 Set 資料結構取得陣列唯一值
 * Get unique values from array using Set data structure
 *
 * 應用情境：
 * - 當需要高效能的去重時（Set 內部實作為雜湊表）
 * - 適用於大多數場景，效能最佳
 * - When you need high-performance deduplication (Set uses hash table internally)
 * - Best performance for most scenarios
 *
 * @param arr - 要去重的陣列 / Array to deduplicate
 * @returns 去重後的陣列 / Deduplicated array
 *
 * @example
 * array_unique_by_set([1, 2, 2, 3]); // => [1, 2, 3]
 * array_unique_by_set(['a', 'b', 'a']); // => ['a', 'b']
 */
export declare function array_unique_by_set<T extends readonly any[]>(arr: T): ITSValueOfTuple<T>;

export {};
