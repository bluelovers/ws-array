/**
 * Created by user on 2018/5/30/030.
 */

import { array_unique, default as lazy_unique } from '../index';
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
			it(label, function ()
			{
				//console.log('it:inner', currentTest.title);
				//console.log('it:inner', currentTest.fullTitle());

				let len = data.length;

				let actual = array_unique(data);

				let actual2;

				if (Array.isArray(data) )
				{
					actual2 = lazy_unique(...data);
				}
				else
				{
					actual2 = lazy_unique(data);
				}

				DEBUG && console.dir(actual);

				expect(actual).to.be.ok;
				expect(actual).to.be.deep.equal(expected);

				expect(actual2).to.be.ok;
				expect(actual2).to.be.deep.equal(expected);

				expect(actual2).to.be.deep.equal(actual);

				expect(actual).to.be.not.deep.equal(data);
				expect(actual.length).to.be.not.deep.equal(len);
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
			it(label, function ()
			{
				//console.log('it:inner', currentTest.title);
				//console.log('it:inner', currentTest.fullTitle());

				let len = data.length;

				let actual = array_unique(data, {
					overwrite: true,
				});

				DEBUG && console.dir(actual);

				expect(actual).to.be.ok;
				expect(actual).to.be.deep.equal(expected);

				expect(data).to.be.deep.equal(actual);
				expect(data).to.be.deep.equal(expected);

				expect(actual.length).to.be.not.deep.equal(len);
				expect(data.length).to.be.not.deep.equal(len);

				expect(actual.length).to.be.deep.equal(expected.length);
				expect(data.length).to.be.deep.equal(expected.length);
			});
		}
	});
});
