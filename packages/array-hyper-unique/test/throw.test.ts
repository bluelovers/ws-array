/**
 * Created by user on 2018/5/30/030.
 */

import { lazy_unique, array_unique } from '../core';

describe(`throw`, () =>
{
	([
		{
			data: [null],
			label: 'null',
		},
		{
			data: [{} as any],
			label: '[]',
		},
	] as {
		data: [any, ...any[]],
		label: string,
	}[])
		.forEach(({
			data,
			label,
		}) =>
		{
			_testIt(data, undefined, label)
		})
	;

	function _testIt(data: [any, ...any[]], expected, label: string = `label`, options?)
	{
		it(label, (done) =>
		{
			expect(function ()
			{
				return array_unique(...data);
			}).toThrowError(TypeError);

			expect(function ()
			{
				return lazy_unique(...data);
			}).toThrowError(TypeError);

			done()
		});
	}
});

