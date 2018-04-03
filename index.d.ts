/**
 * Created by user on 2018/4/3/003.
 */
import * as sortObject from './core';
declare const sortObjectKeys: {
    <T>(object: T, options?: sortObject.IOptions & {
        useSource: true;
    }): T;
    <T>(object: T, options?: sortObject.IOptions & {
        keys: string[];
        onlyKeys: true;
    }): Partial<T>;
    <T>(object: T, options?: sortObject.IOptions): Partial<T>;
    <T>(object: T, sortFn: (a: any, b: any) => any): Partial<T>;
    <T>(object: T, sortWith: string[]): Partial<T>;
} & {
    default: {
        <T>(object: T, options?: sortObject.IOptions & {
            useSource: true;
        }): T;
        <T>(object: T, options?: sortObject.IOptions & {
            keys: string[];
            onlyKeys: true;
        }): Partial<T>;
        <T>(object: T, options?: sortObject.IOptions): Partial<T>;
        <T>(object: T, sortFn: (a: any, b: any) => any): Partial<T>;
        <T>(object: T, sortWith: string[]): Partial<T>;
    };
    sortObjectKeys: {
        <T>(object: T, options?: sortObject.IOptions & {
            useSource: true;
        }): T;
        <T>(object: T, options?: sortObject.IOptions & {
            keys: string[];
            onlyKeys: true;
        }): Partial<T>;
        <T>(object: T, options?: sortObject.IOptions): Partial<T>;
        <T>(object: T, sortFn: (a: any, b: any) => any): Partial<T>;
        <T>(object: T, sortWith: string[]): Partial<T>;
    };
};
declare namespace sortObjectKeys {
    type IOptions = sortObject.IOptions;
}
export = sortObjectKeys;
