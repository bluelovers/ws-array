import { IOptions } from 'array-hyper-unique';

/**
 * 同步陣列去重裝飾器
 * Synchronous array deduplication decorator
 *
 * 應用情境：
 * - 自動對方法回傳的陣列進行深度去重
 * - 適合用於 API 資料處理、快取結果處理
 * - Automatically deep deduplicate arrays returned by methods
 * - Suitable for API data processing, cache result handling
 *
 * @param options - 去重選項 / Deduplication options
 * @returns 裝飾器 / Decorator
 *
 * @example
 * class DataService {
 *   @ArrayUniqueDecorator()
 *   getItems() {
 *     return [{id: 1}, {id: 1}, {id: 2}]; // 只會回傳 [{id: 1}, {id: 2}]
 *   }
 * }
 */
export declare function ArrayUniqueDecorator<T extends any = any>(options?: IOptions<T>): <T_1 extends Function>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
/**
 * 覆寫模式陣列去重裝飾器
 * Overwrite mode array deduplication decorator
 *
 * 應用情境：
 * - 在原陣列上進行去重修改，節省記憶體
 * - Modify array in-place for memory efficiency
 *
 * @param options - 去重選項 / Deduplication options
 * @returns 裝飾器 / Decorator
 */
export declare function ArrayUniqueOverwriteDecorator<T extends any = any>(options?: IOptions<T>): <T_1 extends Function>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
/**
 * 異步陣列去重裝飾器
 * Async array deduplication decorator
 *
 * 應用情境：
 * - 處理非同步方法回傳的 Promise，解析後進行去重
 * - 適合用於非同步 API 資料獲取後的處理
 * - Handle Promise returns from async methods, deduplicate after resolution
 * - Suitable for async API data fetching and processing
 *
 * @param options - 去重選項 / Deduplication options
 * @returns 異步裝飾器 / Async decorator
 *
 * @example
 * class ApiService {
 *   @ArrayUniqueAsyncDecorator()
 *   async fetchItems() {
 *     return Promise.resolve([{id: 1}, {id: 1}, {id: 2}]);
 *   }
 * }
 */
export declare function ArrayUniqueAsyncDecorator<T extends any = any>(options?: IOptions<T>): <T_1 extends () => Promise<any>>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
/**
 * 異步覆寫模式陣列去重裝飾器
 * Async overwrite mode array deduplication decorator
 *
 * @param options - 去重選項 / Deduplication options
 * @returns 異步裝飾器 / Async decorator
 */
export declare function ArrayUniqueOverwriteAsyncDecorator<T extends any = any>(options?: IOptions<T>): <T_1 extends () => Promise<any>>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;

export {
	ArrayUniqueDecorator as default,
};

export {};
