
export function _typeOf(target: unknown)
{
	if (target === null)
	{
		return 'null' as const
	}

	return typeof target
}
