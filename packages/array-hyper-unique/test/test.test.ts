/**
 * Created by user on 2018/5/30/030.
 */

import getTestcase from './_data';
import { lazy_unique, array_unique } from '../src/index';

describe(`suite`, () =>
{
	getTestcase()
		.forEach(function ({
			data,
			expected,
			label,
		})
		{
			_testIt(data, expected, label)
		})
	;

	function _testIt(data, expected, label: string = `label`)
	{
		it(label, (done) =>
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let len = data.length;

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

			expect(actual).toBeTruthy();
			expect(actual).toEqual(expected);

			expect(actual2).toBeTruthy();
			expect(actual2).toEqual(expected);

			expect(actual2).toEqual(actual);

			expect(actual).not.toEqual(data);
			expect(actual.length).not.toEqual(len);

			done()
		});
	}
});

// @ts-ignore
describe(`overwrite source input`, () =>
{
	getTestcase()
		.forEach(function ({
			data,
			expected,
			label,
		})
		{
			_testIt(data, expected, label)
		})
	;

	function _testIt(data, expected, label: string = `label`)
	{
		it(label, () =>
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let len = data.length;

			let actual = array_unique(data, {
				overwrite: true,
			});

			expect(actual).toBeTruthy();
			expect(actual).toEqual(expected);

			expect(data).toEqual(actual);
			expect(data).toEqual(expected);

			expect(actual.length).not.toEqual(len);
			expect(data.length).not.toEqual(len);

			expect(actual.length).toEqual(expected.length);
			expect(data.length).toEqual(expected.length);

			expect(actual).toMatchSnapshot();
			expect(data).toMatchSnapshot();
		});
	}
});

