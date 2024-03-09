import { array_unique, array_unique_overwrite, IOptions } from 'array-hyper-unique';

function _core<T extends any = any>(fn: typeof array_unique, options?: IOptions<T>)
{
	return <T extends Function>(target: object,
		propertyKey: string | symbol,
		descriptor: TypedPropertyDescriptor<T>
	) =>
	{
		const old = descriptor.value;

		// @ts-ignore
		descriptor.value = function (...argv)
		{
			return fn(old.apply(this, argv), options)
		}
	}
}

function _coreAsync<T extends any = any>(fn: typeof array_unique, options?: IOptions<T>)
{
	return <T extends () => Promise<any>>(target: object,
		propertyKey: string | symbol,
		descriptor: TypedPropertyDescriptor<T>
	) =>
	{
		const old = descriptor.value;

		// @ts-ignore
		descriptor.value = function (...argv)
		{
			return old.apply(this, argv)
				.then(value => fn(value, options))
		}
	}
}

export function ArrayUniqueDecorator<T extends any = any>(options?: IOptions<T>)
{
	return _core(array_unique, options)
}

export function ArrayUniqueOverwriteDecorator<T extends any = any>(options?: IOptions<T>)
{
	return _core(array_unique_overwrite, options)
}

export function ArrayUniqueAsyncDecorator<T extends any = any>(options?: IOptions<T>)
{
	return _coreAsync(array_unique, options)
}

export function ArrayUniqueOverwriteAsyncDecorator<T extends any = any>(options?: IOptions<T>)
{
	return _coreAsync(array_unique_overwrite, options)
}

export default ArrayUniqueDecorator
