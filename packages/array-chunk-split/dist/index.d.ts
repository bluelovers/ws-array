/**
 * pick K and mark as Required
 */
export declare type ITSRequiredPick<T, K extends keyof T = keyof T> = {
	[P in K]-?: T[P];
};
/**
 * pick K and mark as Partial
 */
export declare type ITSPartialPick<T, K extends keyof T = keyof T> = {
	[P in K]?: T[P];
};
/**
 * https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
 */
export declare type ITSRequireAtLeastOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> & {
	[K in Keys]-?: ITSRequiredPick<T, K> & ITSPartialPick<T, Exclude<Keys, K>>;
}[Keys];
export declare type ITSValueOrArray<T> = T | T[];
/**
 * same as T[][]
 */
export interface IChunkArray<T> extends Array<T[]> {
}
/**
 * will calls a defined callback function on each element of an array, and returns an array that contains the results.
 */
export interface IMapCallback<T, R = T> {
	(value: T[], index: number, array: IChunkArray<T>): R;
	(value: T[], index: number, array: IChunkArray<T>): T;
}
export type IOptions<T> = {
	/**
	 * source array
	 */
	inputArray: T[];
} & ITSRequireAtLeastOne<{
	/**
	 * Split an array into arrays with max chunk length
	 */
	maxChunkLength?: number;
	/**
	 * Split an array into arrays of chunk with max size
	 */
	maxChunkSize?: number;
}, "maxChunkLength" | "maxChunkSize">;
/**
 * by default will return a array with first value in chunk
 *
 * if mapMethod = true will return last value of chunk
 *
 * if give mapMethod is function
 * will calls a defined callback function on each element of an array, and returns an array that contains the results.
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
 * Split an array into arrays of chunk with max size
 *
 * @example arrayChunkBySize([1, 2, 3, 4, 5, 6, 7, 8], 5); // => [[1, 2, 3, 4, 5], [6, 7, 8]]
 */
export declare function arrayChunkBySize<T>(arr: T[], maxChunkSize: ITSValueOrArray<number>): IChunkArray<T>;
/**
 * Split an array into arrays with max chunk length
 *
 * @example arrayChunkSplit([1, 2, 3, 4, 5, 6, 7, 8], 4); // => [[1, 2], [3, 4], [5, 6], [7, 8]]
 */
export declare function arrayChunkSplit<T>(arr: T[], maxChunkLength: number): IChunkArray<T>;

export {
	arrayChunkSplit as default,
};

export {};
