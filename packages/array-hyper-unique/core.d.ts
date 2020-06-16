import { IOptions } from './lib/types';
export * from './lib/types';
export * from './lib/util';
export declare function array_unique<T>(arr: T, options?: IOptions<T>): T;
export declare function array_unique_overwrite<T>(arr: T, options?: IOptions<T>): T;
export declare function lazy_unique<T extends any[]>(arr: T): T;
export declare namespace lazy_unique {
    var array_unique: typeof import("./core").array_unique;
    var array_unique_overwrite: typeof import("./core").array_unique_overwrite;
    var lazy_unique_overwrite: typeof import("./core").lazy_unique_overwrite;
    var equals: typeof import("./lib/util").equals;
    var defaultFilter: typeof import("./lib/util").defaultFilter;
    var defaultChecker: typeof import("./lib/util").defaultChecker;
    var lazy_unique: typeof import("./core").lazy_unique;
    var default: typeof import("./core").lazy_unique;
}
export declare function lazy_unique<T, T1, T2>(a1: T1, a2: T2, ...arr: T[]): Array<T | T1 | T2>;
export declare namespace lazy_unique {
    var array_unique: typeof import("./core").array_unique;
    var array_unique_overwrite: typeof import("./core").array_unique_overwrite;
    var lazy_unique_overwrite: typeof import("./core").lazy_unique_overwrite;
    var equals: typeof import("./lib/util").equals;
    var defaultFilter: typeof import("./lib/util").defaultFilter;
    var defaultChecker: typeof import("./lib/util").defaultChecker;
    var lazy_unique: typeof import("./core").lazy_unique;
    var default: typeof import("./core").lazy_unique;
}
export declare function lazy_unique<T>(...arr: Array<T | T[]>): T | (T | T[])[];
export declare namespace lazy_unique {
    var array_unique: typeof import("./core").array_unique;
    var array_unique_overwrite: typeof import("./core").array_unique_overwrite;
    var lazy_unique_overwrite: typeof import("./core").lazy_unique_overwrite;
    var equals: typeof import("./lib/util").equals;
    var defaultFilter: typeof import("./lib/util").defaultFilter;
    var defaultChecker: typeof import("./lib/util").defaultChecker;
    var lazy_unique: typeof import("./core").lazy_unique;
    var default: typeof import("./core").lazy_unique;
}
export declare function lazy_unique_overwrite<T>(...arr: Array<T | T[]>): T | (T | T[])[];
export default lazy_unique;
