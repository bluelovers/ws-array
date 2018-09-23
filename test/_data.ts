/**
 * Created by user on 2018/5/31/031.
 */

export function getTestcase(): {
	label?: string,

	data: any[],
	expected: any[],
}[]
{
	let mapA = new Map();
	let mapB = new Map();
	mapA.set('a', 1);
	mapA.set('b', 2);
	mapA.set('c', 3);
	mapB.set('c', 3);
	mapB.set('b', 2);
	mapB.set('a', 1);

	let fn1 = function() {};
	let fn2 = function() {};
	let fn3 = function() {};

	let list: ReturnType<typeof getTestcase> = [
		{
			label: `main mixin test`,

			data: [
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
				{ a: {} },
				{ a: { b: 3, c: undefined } },
				/1/,
				{},
				/1/,
				/1/g,
				/1/i,
				{},
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
				{ a: {} },
				{ a: { b: 3, c: undefined } },
				/1/,
				{},
				/1/,
				/1/g,
				/1/i,
				{},
				'1',
				'0',
				'true',
				'undefined',
				'null',
				'false',
				'',
				NaN, NaN, NaN, Infinity,
				fn1, fn2, fn3, fn2, fn3, fn2,
			],

			expected: [
				1,
				0,
				true,
				undefined,
				null,
				false,
				['a', 'b', 'c'],
				['a', 'c', 'b'],
				{ a: { b: 2 } },
				{ a: { b: 3 } },
				{ a: { b: undefined } },
				{ a: {} },
				{ a: { b: 3, c: undefined } },
				/1/,
				{},
				/1/g,
				/1/i,
				'1',
				'0',
				'true',
				'undefined',
				'null',
				'false',
				'',
				NaN, Infinity,
				fn1, fn2, fn3,
			],
		},

		{
			label: `object`,

			data: [{ a: { b: 2 } }, { a: { b: 2 } }, { a: { b: 3 } }],
			expected: [{ a: { b: 2 } }, { a: { b: 3 } }],
		},

		{
			label: `number`,

			data: [1, 2, 3, 3, 0],
			expected: [1, 2, 3, 0],
		},
		{
			label: `number 2`,

			data: [1, 2, 3, 3, 0, NaN, NaN, NaN, Infinity],
			expected: [1, 2, 3, 0, NaN, Infinity],
		},

		{
			label: `string`,

			data: ['1', '2', '3', '3', '0', '', 'a', 'b', 'c', 'a', 'b', 'd'],
			expected: ['1', '2', '3', '0', '', 'a', 'b', 'c', 'd'],
		},

		{
			label: `string[]`,

			data: [['a', 'b', 'c'], ['a', 'b', 'c'],],
			expected: [['a', 'b', 'c'],],
		},

		{
			label: `RegExp`,

			data: [/1/, {}, /1/g, /1/i, /1/, {}, /1/g, /1/i,],
			expected: [/1/, {}, /1/g, /1/i,],
		},

		{
			label: `boolean`,

			data: [true, true, false, false, true],
			expected: [true, false],
		},

		{
			label: `boolean 2`,

			data: [true, true, false, false, true, null, 0, undefined, null, 0, undefined, 0, NaN, Infinity, ''],
			expected: [true, false, null, 0, undefined, NaN, Infinity, ''],
		},

	];

	{
		let mapA = new Map();
		let mapB = new Map();
		mapA.set('a', 1);
		mapA.set('b', 2);
		mapA.set('c', 3);
		mapB.set('c', 3);
		mapB.set('b', 2);
		mapB.set('a', 1);

		list.push({
			label: `Map`,

			data: [
				mapA,
				mapB,
				{ 'a': 1, 'b': 2, 'c': 3 },
				{ 'a': 1, 'b': 2, 'c': 3 }
			],
			expected: [
				mapA,
				{ 'a': 1, 'b': 2, 'c': 3 }
			],
		});
	}

	{
		let fn1 = function() {};
		let fn2 = function() {};
		let fn3 = function() {};

		list.push({
			label: `function`,

			data: [fn1, fn2, fn3, fn2, fn3, fn2],
			expected: [fn1, fn2, fn3],
		});

		list.push({
			label: `function 2`,

			data: [fn1, fn2, fn3, fn2, fn3, {}, fn2, {}],
			expected: [fn1, fn2, fn3, {}],
		});
	}

	return list;
}

export default getTestcase
