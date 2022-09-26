export interface IOptionsDistributeGroupToArray<T> {
	init?(): T[][];
	groupArraySize?: number;
}
export declare function _createGroupArray<T, N extends number = 4>(length: N): T[][] & {
	readonly length: N;
};
export declare function distributeGroupToArrayCore<T>(group: Record<string, T[]> | Map<any, T[]>, options?: IOptionsDistributeGroupToArray<T>): T[][];
export declare function mapToRecord<T>(map: Map<any, T[]>): Record<string, T[]>;
export declare function distributeGroupToArray<T>(group: Record<string, T[]> | Map<any, T[]>, options?: IOptionsDistributeGroupToArray<T>): T[];

export {
	distributeGroupToArray as default,
};

export {};
