export declare function lazy_unique<T extends any[]>(arr: T): T;
export declare function lazy_unique<T, T1, T2>(a1: T1, a2: T2, ...arr: T[]): Array<T | T1 | T2>;
export declare function lazy_unique<T>(...arr: Array<T | T[]>): T | (T | T[])[];
export declare function array_unique<T>(arr: T, options?: {
    checker?(element: T[keyof T], array: T[keyof T], arr_new?: T, arr_old?: T): boolean;
    checker?<R>(element: R[keyof R], array: R[keyof R], arr_new?: R, arr_old?: R): boolean;
    overwrite?: boolean;
    filter?(v: T[keyof T]): boolean;
    filter?<R>(v: R[keyof R]): boolean;
}): T;
export declare function lazy_unique_overwrite<T>(...arr: Array<T | T[]>): T | (T | T[])[];
export declare function array_unique_overwrite<T>(arr: T, options?: IOptions<T>): T;
export declare type IOptions<T> = {
    checker?(element: T[keyof T], array: T[keyof T], arr_new?: T, arr_old?: T): boolean;
    checker?<R>(element: R[keyof R], array: R[keyof R], arr_new?: R, arr_old?: R): boolean;
    overwrite?: boolean;
    filter?(v: T[keyof T]): boolean;
    filter?<R>(v: R[keyof R]): boolean;
};
export declare function defaultFilter<T>(options?: IOptions<T>): <K extends any[]>(val: K[keyof K], index: number, arr: K) => boolean;
export declare function defaultChecker<T, R>(element: T, value: R, arr_new?: Array<T | R>, arr_old?: Array<T | R>): boolean;
export default lazy_unique;
