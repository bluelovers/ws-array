//@noUnusedParameters:false



import { defaultCompare } from '../src/index';
import assert from 'node:assert/strict';
import { describe, it, TestContext, test } from 'node:test';

describe('defaultCompare', () =>
{

	it('should sort an array with null and undefined values', function ()
	{
		const arr = ['c', 'a', undefined, 'b', 'd', null, 'e'];
		assert.deepStrictEqual(arr.sort(defaultCompare), ['a', 'b', 'c', 'd', 'e', null, undefined]);
	});

	test(`mixin`, (t) =>
	{
		const arr = [
			{ name: 'c', title: 'C' },
			undefined,
			{ name: 'a', title: 'A' },
			{ title: 'G' },
			{ name: 'b', title: 'B' },
			null,
			{ name: 'd', title: 'D' },
			{ name: null, title: 'F' },
			{ name: 'e', title: 'E' },
		];

		let actual = arr.sort(defaultCompare);

		t.assert.snapshot(actual);

	});

	test(`mixin with symbol`, (t: TestContext) =>
	{
		const arr = [
			'c', 'a', undefined, 'b', 'd', null, 'e',
			{ name: 'c', title: 'C' },
			undefined,
			{ name: 'a', title: 'A' },
			{ title: 'G' },
			{ name: 'b', title: 'B' },
			null,
			{ name: 'd', title: 'D' },
			{ name: null, title: 'F' },
			{ name: 'e', title: 'E' },
			new URL(`https://bafybeicm5clh7fl4up4prnbfqksou6vsp5voth54rcsxhsjysimm3o77fq.on.fleek.co/`),
			Symbol.iterator,
			Symbol('iterator'),
			Symbol('Symbol.iterator'),
			Symbol(),
		];

		let actual = arr.sort(defaultCompare);

		t.assert.snapshot(actual);

	});

})
