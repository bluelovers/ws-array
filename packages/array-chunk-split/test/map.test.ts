/**
 * Created by User on 2019/7/19.
 */

// @ts-ignore
/// <reference types="mocha" />
// @ts-ignore
/// <reference types="benchmark" />
// @ts-ignore
/// <reference types="chai" />
// @ts-ignore
/// <reference types="node" />

// @ts-ignore
import { chai, relative, expect, path, assert, util, mochaAsync, SymbolLogOutput } from './_local-dev';
import { arrayChunkMap } from '../index';

// @ts-ignore
describe(relative(__filename), () =>
{
	// @ts-ignore
	let currentTest: Mocha.Test;

	// @ts-ignore
	beforeEach(function ()
	{
		// @ts-ignore
		currentTest = this.currentTest;

		delete currentTest[SymbolLogOutput];

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	afterEach(function ()
	{
		let out = currentTest[SymbolLogOutput];
		let t = typeof out;

		if (t === 'string')
		{
			console.log(`----------`);
			console.log(out);
			console.log(`----------`);
		}
		else if (t === 'function')
		{
			out(currentTest)
		}
		else if (out != null)
		{
			console.dir(out);
		}

	});

	// @ts-ignore
	describe(`arrayChunkMap`, () =>
	{

		// @ts-ignore
		it(`default`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkMap({
				inputArray: arr,
				maxChunkLength: 2,
			});
			let expected = [ 1, 5 ];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});

		// @ts-ignore
		it(`default`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkMap({
				inputArray: arr,
				maxChunkLength: 2,
				mapMethod: true,
			});
			let expected = [ 4, 8 ];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});

		// @ts-ignore
		it(`default`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkMap({
				inputArray: arr,
				maxChunkLength: 3,
				mapMethod(value, index)
				{
					return index
				}
			});
			let expected = [ 0, 1, 2 ];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});

		// @ts-ignore
		it(`default`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkMap({
				inputArray: arr,

				mapMethod(value, index)
				{
					return index
				},

				maxChunkSize: 2,
			});
			let expected = [ 0, 1, 2, 3 ];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});

		// @ts-ignore
		it(`throw error`, function ()
		{
			expect(() => arrayChunkMap({
				inputArray: [],
			} as any)).throw();
		});

	});
});
