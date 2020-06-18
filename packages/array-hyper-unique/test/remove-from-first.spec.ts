import getTestcase from './_data';
import * as core from '../core';
import { inspect } from 'util';

describe(`removeFromFirst`, () =>
{

	let fn1 = function() {};
	let fn2 = function() {};
	let fn3 = function() {};


	([
		{
			label: `simple`,
			data: [
				2,
				4,
				3,
				1,
				3,
				2,
			],
		},
		{
			label: `mixin test`,
			data: [
				2,
				4,
				1,
				{ a: {} },
				'undefined',
				'null',
				'false',
				'',
				NaN, NaN, NaN, Infinity,
				fn1, fn2, fn3, fn2, fn3, fn2,
				3,
				1,
				3,
				['a', 'b', 'c'],
				['a', 'c', 'b'],
				{ a: { b: 2 } },

				{ a: { b: 3, c: undefined } },
				/1/,
				{},
				/1/,
				/1/g,
				0,
				true,
				undefined,
				null,
				false,
				['a', 'b', 'c'],
				['a', 'b', 'c'],
				['a', 'c', 'b'],
				{ a: { b: 2 } },

				/1/,
				{},
				/1/,
				/1/g,
				/1/i,
				{ a: { b: 2 } },
				{ a: { b: 3 } },
				{ a: { b: undefined } },
				{ a: {} },
				{ a: { b: 3, c: undefined } },
				{},
				1,
				0,
				true,
				undefined,
				null,
				false,
				['a', 'b', 'c'],

				'true',
				{ a: { b: 2 } },
				{ a: { b: 3 } },
				{ a: { b: undefined } },

				/1/i,
				{},
				/1/,
				/1/g,
				{},
				'1',
				'0',
				2,
			],
		},
	])
		.forEach(function ({
			data,
			label,
		}, index)
		{
			_testIt(data, index, `array_unique`, label)
			_testIt(data, index, `array_unique_overwrite`, label)

		})
	;

	function _testIt(data, index, fnName: keyof typeof core, label?: string)
	{
		label = label ?? `${index} array(${data.length})`;
		label = `${fnName} ${label}`

		it(label, (done) =>
		{
			const fn = core[fnName]

			const len = data.length;

			// @ts-ignore
			let a1 = fn(data.slice())
			// @ts-ignore
			let a2 = fn(data.slice(), {
				removeFromFirst: true,
			})

			expect(a1.length).toBeLessThan(len);

			expect(a1).toHaveLength(a2.length);

			expect(a1).not.toStrictEqual(data);
			expect(a2).not.toStrictEqual(data);

			expect(a1).not.toStrictEqual(a2);

			expect({
				a1,
				a2,
			}).toMatchSnapshot();

			//a1.sort();
			//a2.sort();

			//expect(a1).toStrictEqual(a2);

			//expect(actual).toMatchSnapshot();

			done();
		});
	}

})
