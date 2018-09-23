/**
 * Created by user on 2018/5/30/030.
 */

import SELF_MODULE = require('../index');
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
	it(`export chk`, () =>
	{
		expect(SELF_MODULE).to.equal(SELF_MODULE.default);
		expect(SELF_MODULE).to.equal(SELF_MODULE.lazy_unique);
		expect(SELF_MODULE).to.equal(lazy_unique);
		expect(SELF_MODULE).to.not.equal(array_unique);
		// @ts-ignore
		expect(SELF_MODULE.equals).to.equal(require('deep-eql'));

		[
			'lazy_unique',
			'array_unique',
			'lazy_unique_overwrite',
			'array_unique_overwrite',
			'defaultFilter',
			'defaultChecker',
			'equals',
			'default',
		].forEach((name) =>
		{
			expect(typeof SELF_MODULE[name] === 'function').to.be.true;
			expect( SELF_MODULE[name]).to.be.ok;

			expect(() => {
				delete SELF_MODULE[name];
			}, name).to.throw(TypeError);
			expect(() => {
				SELF_MODULE[name] = null;
			}, name).to.throw(TypeError);
			expect(() => {
				SELF_MODULE[name][name] = 1;
			}, name).to.throw(TypeError);
			expect(() => {
				Object.defineProperty(SELF_MODULE[name], "__test", { value: true });
			}, name).to.throw(TypeError);
		});

		// @ts-ignore
		expect( SELF_MODULE.__esModule).to.be.ok;


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
