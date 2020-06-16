/**
 * Created by user on 2018/5/30/030.
 */

import getTestcase from './_data';
import { array_unique, IOptions } from '../core';

describe(`(v) => v`, () =>
{
	let options: IOptions<any> = {
		filter(v)
		{
			return v;
		},
	};

	getTestcase()
		.forEach(function ({
			data,
			expected,
			label,
		})
		{
			expected = expected.filter(options.filter);

			_testIt(data, expected, label, options)
		})
	;

	function _testIt(data, expected, label: string = `label`, options?)
	{
		it(label, (done) =>
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let len = data.length;

			let actual = array_unique(data, options);

			expect(actual).toBeTruthy();
			expect(actual).toEqual(expected);

			expect(actual).not.toEqual(data);
			expect(actual.length).not.toEqual(len);

			expect(actual).toMatchSnapshot();
			expect(data).toMatchSnapshot();

			done()
		});
	}
});

