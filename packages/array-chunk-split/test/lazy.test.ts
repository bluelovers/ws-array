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

import { chai, relative, expect, path, assert, util, mochaAsync, SymbolLogOutput } from './_local-dev';
import { arrayChunkBySize, arrayChunkSplit } from '../index';

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
	describe(`arrayChunkSplit`, () =>
	{
		// @ts-ignore
		it(`3`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkSplit(arr, 3);
			let expected = [[1, 2, 3], [4, 5, 6], [7, 8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`2`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkSplit(arr, 2);
			let expected = [[1, 2, 3, 4], [5, 6, 7, 8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`4`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkSplit(arr, 4);
			let expected = [[1, 2], [3, 4], [5, 6], [7, 8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`1`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkSplit(arr, 1);
			let expected = [[1, 2, 3, 4, 5, 6, 7, 8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`5 but will only get 4`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkSplit(arr, 5);
			let expected = arrayChunkSplit(arr, 4);

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`8`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkSplit(arr, 8);
			let expected = [[1], [2], [3], [4], [5], [6], [7], [8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`empty`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [];

			let actual = arrayChunkSplit(arr, 8);
			let expected = [];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

	});

	// @ts-ignore
	describe(`arrayChunkBySize`, () =>
	{
		// @ts-ignore
		it(`1`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkBySize(arr, 1);
			let expected = arrayChunkSplit(arr, arr.length);

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`4`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkBySize(arr, 4);
			let expected = arrayChunkSplit(arr, 2);

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`5`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkBySize(arr, 5);
			let expected = [[1, 2, 3, 4, 5], [6, 7, 8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`6`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkBySize(arr, 6);
			let expected = [[1, 2, 3, 4, 5, 6], [7, 8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`7`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkBySize(arr, 7);
			let expected = [[1, 2, 3, 4, 5, 6, 7], [8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`8`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [1, 2, 3, 4, 5, 6, 7, 8];

			let actual = arrayChunkBySize(arr, 8);
			let expected = [[1, 2, 3, 4, 5, 6, 7, 8]];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

		// @ts-ignore
		it(`empty`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const arr = [];

			let actual = arrayChunkBySize(arr, 8);
			let expected = [];

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		});

	});

});
