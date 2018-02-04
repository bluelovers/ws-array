/**
 * Created by user on 2018/2/4/004.
 */

import localDev, { relative, expect, path, assert, util } from './_local-dev';

import * as sortObject from '../index';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest;

	// @ts-ignore
	beforeEach(function ()
	{
		currentTest = this.currentTest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`suite`, () =>
	{
		// @ts-ignore
		it(`source will not change order`, function (done)
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			//expect(r).to.be.ok;
			//assert.isOk(r.value, util.inspect(r));

			let o = {a: 1, c: 2, e: 5, d: 4, b: 3};
			let o2 = sortObject(o, {
				keys: ['a', 'b'],
			});

			console.log(o, o2);

			expect(o2).to.be.deep.equal({ a: 1, b: 3, c: 2, d: 4, e: 5 });
			expect(o2).to.be.deep.equal(o);
			expect(Object.keys(o2)).to.not.deep.equal(Object.keys(o));
			expect(o2 === o).to.deep.equal(false);

			done();
		});

		// @ts-ignore
		it(`source will change order`, function (done)
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			//expect(r).to.be.ok;
			//assert.isOk(r.value, util.inspect(r));

			let o = {a: 1, c: 2, e: 5, d: 4, b: 3};
			let o2 = sortObject(o, {
				keys: ['a', 'b'],
				useSource: true,
			});

			console.log(o, o2);

			expect(o2).to.be.deep.equal({ a: 1, b: 3, c: 2, d: 4, e: 5 });
			expect(o2).to.be.deep.equal(o);
			expect(Object.keys(o2)).to.deep.equal(Object.keys(o));
			expect(o2 === o).to.deep.equal(true);

			done();
		});
	});
});
