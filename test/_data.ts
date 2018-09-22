/**
 * Created by user on 2018/5/31/031.
 */

export function getTestcase(): {
	label?: string,

	data: any[],
	expected: any[],
}[]
{
	let list: ReturnType<typeof getTestcase> = [
		{
			label: `main test`,

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
			label: `string`,

			data: ['1', '2', '3', '3', '0', ''],
			expected: ['1', '2', '3', '0', ''],
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

	return list;
}

export default getTestcase
