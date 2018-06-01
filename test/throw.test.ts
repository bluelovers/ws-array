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
	describe(`throw`, () =>
	{
		let options: IOptions<any> = {
			filter(v)
			{
				return v;
			},
		};

		[
			{
				data: [null],
				label: 'null',
			},
			{
				data: [{}],
				label: '[]',
			},
		]
			.forEach(function ({
				data,
				label,
			})
			{
				_testIt(data, undefined, label)
			})
		;

		function _testIt(data, expected, label: string = `label`, options?)
		{
			it(label, function ()
			{
				expect(function ()
				{
					// @ts-ignore
					return array_unique(...data);
				}).to.throw(TypeError);

				expect(function ()
				{
					return lazy_unique(...data);
				}).to.throw(TypeError);
			});
		}
	});
});
