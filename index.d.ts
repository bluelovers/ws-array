declare function sortObject<T>(object: T, options?: sortObject.IOptions & {
    useSource: true;
}): T;
declare function sortObject<T>(object: T, options?: sortObject.IOptions & {
    keys: string[];
    onlyKeys: true;
}): Partial<T>;
declare function sortObject<T>(object: T, options?: sortObject.IOptions): Partial<T>;
declare function sortObject<T>(object: T, sortFn: (a, b) => any): Partial<T>;
declare function sortObject<T>(object: T, sortWith: string[]): Partial<T>;
declare module sortObject {
    interface IOptions {
        keys?: string[];
        sort?: (a, b) => any;
        desc?: boolean;
        allowNotExists?: boolean;
        useSource?: boolean;
        onlyKeys?: boolean;
    }
}
export = sortObject;
