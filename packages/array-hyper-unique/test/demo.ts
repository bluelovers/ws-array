/**
 * Created by user on 2018/5/30/030.
 */

import { array_unique, default as lazy_unique } from '../index';

_testIt([
		1,
		0,
		true,
		undefined,
		null,
		false,
		['a', 'b', 'c'],
		['a', 'b', 'c'],
		['a', 'c', 'b'],
		{ a: { b: 2 } },
		{ a: { b: 2 } },
		{ a: { b: 3 } },
		{ a: { b: undefined } },
		{ a: {  } },
		{ a: { b: 3, c: undefined } },
	])
;

_testIt(
	[{a: {b: 2}}, {a: {b: 2}}, {a: {b: 3}}],
);

_testIt(
	[1, 2, 3, 3],
);

_testIt(
	[['a', 'b', 'c'], ['a', 'b', 'c'],],
);

function _testIt(data)
{
	let actual = array_unique(data);

	let actual2;

	if (Array.isArray(data))
	{
		actual2 = lazy_unique(...data);
	}
	else
	{
		actual2 = lazy_unique(data);
	}

	console.log(`========= input =========`);

	console.dir(data);

	console.log(`--------- array_unique ---------`);
	console.dir(actual);

	console.log(`--------- lazy_unique ---------`);
	console.dir(actual2);
}
