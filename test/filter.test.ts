/**
 * Created by user on 2018/5/30/030.
 */

import { array_unique, default as lazy_unique, IOptions } from '../index';
import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';
import getTestcase from './_data';

// @ts-ignore
let DEBUG = process.argv.includes('--debug');

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
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
			it(label, function ()
			{
				//console.log('it:inner', currentTest.title);
				//console.log('it:inner', currentTest.fullTitle());

				let len = data.length;

				let actual = array_unique(data, options);

				DEBUG && console.dir(actual);

				expect(actual).to.be.ok;
				expect(actual).to.be.deep.equal(expected);

				expect(actual).to.be.not.deep.equal(data);
				expect(actual.length).to.be.not.deep.equal(len);
			});
		}
	});
});
