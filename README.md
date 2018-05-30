# array-hyper-unique

    Get unique values of an array. Really, like deeply unique.

[API](index.d.ts)

1. this module base on [arr-unique](https://www.npmjs.com/package/arr-unique)
2. but rewrite to typescript and bug fix
3. also add option control

## demo

[demo.ts](test/demo.ts)

```ts
import { array_unique, default as lazy_unique } from 'array-hyper-unique';

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
```

```ts
========= input =========
[ 1,
  0,
  true,
  undefined,
  null,
  false,
  [ 'a', 'b', 'c' ],
  [ 'a', 'b', 'c' ],
  [ 'a', 'c', 'b' ],
  { a: { b: 2 } },
  { a: { b: 2 } },
  { a: { b: 3 } },
  { a: { b: undefined } },
  { a: {} },
  { a: { b: 3, c: undefined } } ]
--------- array_unique ---------
[ 1,
  0,
  true,
  undefined,
  null,
  false,
  [ 'a', 'b', 'c' ],
  [ 'a', 'c', 'b' ],
  { a: { b: 2 } },
  { a: { b: 3 } },
  { a: { b: undefined } },
  { a: {} },
  { a: { b: 3, c: undefined } } ]
--------- lazy_unique ---------
[ 1,
  0,
  true,
  undefined,
  null,
  false,
  [ 'a', 'b', 'c' ],
  [ 'a', 'c', 'b' ],
  { a: { b: 2 } },
  { a: { b: 3 } },
  { a: { b: undefined } },
  { a: {} },
  { a: { b: 3, c: undefined } } ]
========= input =========
[ { a: { b: 2 } }, { a: { b: 2 } }, { a: { b: 3 } } ]
--------- array_unique ---------
[ { a: { b: 2 } }, { a: { b: 3 } } ]
--------- lazy_unique ---------
[ { a: { b: 2 } }, { a: { b: 3 } } ]
========= input =========
[ 1, 2, 3, 3 ]
--------- array_unique ---------
[ 1, 2, 3 ]
--------- lazy_unique ---------
[ 1, 2, 3 ]
========= input =========
[ [ 'a', 'b', 'c' ], [ 'a', 'b', 'c' ] ]
--------- array_unique ---------
[ [ 'a', 'b', 'c' ] ]
--------- lazy_unique ---------
[ [ 'a', 'b', 'c' ] ]
```

## options

```ts
array_unique(arr_input, {
	checker(element, array, arr_new, arr_old)
	{
		let bool: boolean;
		
		// do equal check
		
		return bool;
	},
	
	// overwrite source array
	overwrite: true,
})
```
