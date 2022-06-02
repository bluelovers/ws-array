//@noUnusedParameters:false

import { basename, extname } from 'path';
import { defaultCompare } from '../src/index';

beforeAll(async () =>
{

});

describe(basename(__filename, extname(__filename)), () =>
{

	it('should sort an array with null and undefined values', function ()
	{
		const arr = ['c', 'a', undefined, 'b', 'd', null, 'e'];
		expect(arr.sort(defaultCompare)).toStrictEqual(['a', 'b', 'c', 'd', 'e', null, undefined]);
	});

	test(`mixin`, () =>
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

		expect(actual).toMatchSnapshot();

	});

	test(`mixin with symbol`, () =>
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

		expect(actual).toMatchSnapshot();

	});

})
