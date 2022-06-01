//@noUnusedParameters:false

import { basename, extname } from 'path';
import { array_unique } from '../src/index';

beforeAll(async () =>
{

});

describe(basename(__filename, extname(__filename)), () =>
{

	test.skip(`dummy`, () => {});

	test(`TypeError: Cannot convert a Symbol value to a string`, () =>
	{
		const list = [
			new URL(`https://bafybeicm5clh7fl4up4prnbfqksou6vsp5voth54rcsxhsjysimm3o77fq.on.fleek.co/`),
			new URL(`https://bafybeicm5clh7fl4up4prnbfqksou6vsp5voth54rcsxhsjysimm3o77fq.on.fleek.co/`),

			new URL(`https://bafybeicm5clh7fl4up4prnbfqksou6vsp5voth54rcsxhsjysimm3o77fq.ipfs.dweb.link/`),
			new URL(`https://bafybeicm5clh7fl4up4prnbfqksou6vsp5voth54rcsxhsjysimm3o77fq.ipfs.dweb.link/`),

		];

		let actual = array_unique(list);

		expect(actual).toMatchSnapshot();

	});

})
