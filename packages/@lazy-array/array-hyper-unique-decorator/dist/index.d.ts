import { IOptions } from 'array-hyper-unique';

export declare function ArrayUniqueDecorator<T>(options?: IOptions<T>): <T_1 extends Function>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
export declare function ArrayUniqueOverwriteDecorator<T>(options?: IOptions<T>): <T_1 extends Function>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
export declare function ArrayUniqueAsyncDecorator<T>(options?: IOptions<T>): <T_1 extends () => Promise<any>>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;
export declare function ArrayUniqueOverwriteAsyncDecorator<T>(options?: IOptions<T>): <T_1 extends () => Promise<any>>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T_1>) => void;

export {
	ArrayUniqueDecorator as default,
};

export {};
