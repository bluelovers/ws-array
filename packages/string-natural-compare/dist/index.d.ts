/**
 * Created by user on 2020/6/4.
 */
export interface IOptionsStringNaturalCompare {
	/**
	 * Set to true to compare strings case-insensitively. Default: false.
	 */
	caseInsensitive?: boolean;
	/**
	 * A string of characters that define a custom character ordering. Default: undefined.
	 */
	alphabet?: string;
}
export interface IOptionsNaturalCompare extends IOptionsStringNaturalCompare {
	desc?: boolean;
}
/**
 * Compare alphanumeric strings the same way a human would,
 * using a natural order algorithm
 * (originally known as the alphanum algorithm)
 * where numeric characters are sorted
 * based on their numeric values rather than their ASCII values.
 */
export declare function naturalCompare(a: string | number, b: string | number, opts?: IOptionsNaturalCompare): number;
export declare namespace naturalCompare {
	export var createNew: typeof createNew;
	export var compareCaseInsensitive: (a: string | number, b: string | number) => number;
	export var caseInsensitive: (a: string | number, b: string | number) => number;
	var _a: typeof naturalCompare;
	export { _a as default };
}
/**
 * create compare with preset options
 */
export declare function createNew(opts?: IOptionsNaturalCompare): (a: string | number, b: string | number) => number;
/**
 * compare strings case-insensitively
 */
export declare const compareCaseInsensitive: (a: string | number, b: string | number) => number;
export default naturalCompare;

export {
	compareCaseInsensitive as caseInsensitive,
};

export {};
