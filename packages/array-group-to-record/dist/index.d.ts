export interface IOptionsForRecord<T> {
	getKey?(item: T, index: number, arr: T[]): string;
	init?(): Record<string, T[]>;
}
export interface IOptionsForMap<T> {
	getKey?(item: T, index: number, arr: T[]): any;
	init?(): Map<any, T[]>;
}
export declare function handleOptions<O extends IOptionsForRecord<any> | IOptionsForMap<any>>(options: O): O;
export declare function arrayGroupToRecord<T>(arr: T[], options?: IOptionsForRecord<T>): Record<string, T[]>;
export declare function arrayGroupToMap<T>(arr: T[], options?: IOptionsForMap<T>): Map<any, T[]>;
export declare function sumGroup<T extends Record<any, any[]> | Map<any, any[]>>(group: T): number;
export default arrayGroupToRecord;

export {};
