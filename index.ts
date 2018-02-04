
function sortObject<T>(object: T, options?: sortObject.IOptions & {
	useSource: true,
}): T
function sortObject<T>(object: T, options?: sortObject.IOptions & {
	keys: string[],
	onlyKeys: true,
}): Partial<T>
function sortObject<T>(object: T, options?: sortObject.IOptions): Partial<T>
function sortObject<T>(object: T, sortFn: (a, b) => any): Partial<T>
function sortObject<T>(object: T, sortWith: string[]): Partial<T>
function sortObject(object, sortWith)
{
	let options: sortObject.IOptions = {};

	if (typeof sortWith === 'function')
	{
		options.sort = sortWith;
	}
	else if (Array.isArray(sortWith))
	{
		options.keys = sortWith;
	}
	else
	{
		options = Object.assign(options, sortWith);
	}

	let keys: string[] = (options.keys || []);

	if (options.onlyKeys)
	{
		options.useSource = false;
	}
	else
	{
		keys = keys.concat()
			.concat(Object.keys(object).sort(options.sort))
		;
	}

	let ret = keys.reduce(function (total, key)
	{
		if (options.allowNotExists || key in object)
		{
			total[key] = object[key];
		}

		return total;
	}, {});

	if (options.useSource)
	{
		Object.keys(ret)
			.forEach(function (key, index, array)
			{
				delete object[key];
				object[key] = ret[key];
			})
		;

		return object;
	}

	return ret;
}

module sortObject
{
	export interface IOptions
	{
		keys?: string[],
		sort?: (a, b) => any,
		desc?: boolean,
		allowNotExists?: boolean,
		useSource?: boolean,
		onlyKeys?: boolean,
	}
}

export = sortObject;
