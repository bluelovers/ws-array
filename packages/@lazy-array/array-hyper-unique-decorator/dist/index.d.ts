import { IOptions } from 'array-hyper-unique';

export declare function ArrayUniqueDecorator<T extends any = any>(options?: IOptions<T>): <T_1 extends Function>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
export declare function ArrayUniqueOverwriteDecorator<T extends any = any>(options?: IOptions<T>): <T_1 extends Function>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
export declare function ArrayUniqueAsyncDecorator<T extends any = any>(options?: IOptions<T>): <T_1 extends () => Promise<any>>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
export declare function ArrayUniqueOverwriteAsyncDecorator<T extends any = any>(options?: IOptions<T>): <T_1 extends () => Promise<any>>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;

export {
	ArrayUniqueDecorator as default,
};

export {};
