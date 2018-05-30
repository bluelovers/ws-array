export declare function lazy_unique<T>(...arr: Array<T | T[]>): T | (T | T[])[];
export declare function array_unique<T>(arr: T, options?: {
    checker?(element: T[keyof T], array: T[keyof T], arr_new: T, arr_old: T): boolean;
    checker?<R>(element: R[keyof R], array: R[keyof R], arr_new: R, arr_old: R): boolean;
    overwrite?: boolean;
}): T;
export declare function defaultChecker<T, R>(element: T, value: R, arr_new: Array<T | R>, arr_old: Array<T | R>): boolean;
export default lazy_unique;
