export declare function _typeOf(target: unknown): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null";
export declare const enum EnumSortCompareResult {
	KEEP = 0,
	RIGHT = 1,
	LEFT = -1
}
export declare function numberCompare(a: unknown, b: unknown): EnumSortCompareResult;
/**
 * will return undefined when a and b not null/undefined
 */
export declare function nullCompare(a: unknown, b: unknown): EnumSortCompareResult;
export declare function symbolCompare(a: unknown, b: unknown): EnumSortCompareResult;
export declare function dateCompare(a: Date, b: Date): number;
export declare function stringCompareLocale(a: string, b: string): number;
export declare function defaultCompareBasic(a: unknown, b: unknown): EnumSortCompareResult;
export declare function defaultCompareWithSymbol(a: unknown, b: unknown): EnumSortCompareResult;
export declare function arraySortWithSymbol<T extends any[]>(arr: T): T;

export {
	defaultCompareWithSymbol as default,
	defaultCompareWithSymbol as defaultCompare,
};

export {};
