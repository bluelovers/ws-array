
import { arrayGroupToRecord, arrayGroupToMap, sumGroup } from '../src/index';

test(`arrayGroupToRecord`, () =>
{

	let data = [
		{
			"name": "Forest",
		},
		{
			"name": "Plains",
		},
		{
			"name": "Forest",
		},
		{
			"name": "Plains",
		},
		{
			"name": "Forest",
		},
		{
			"name": "Plains",
		},
	];

	let actual = arrayGroupToRecord(data);

	expect(actual).toMatchSnapshot();
	expect(sumGroup(actual)).toStrictEqual(data.length);

});

test(`arrayGroupToMap`, () =>
{

	let data = [
		{
			"name": "Forest",
		},
		{
			"name": "Plains",
		},
		{
			"name": "Forest",
		},
		{
			"name": "Plains",
		},
		{
			"name": "Forest",
		},
		{
			"name": "Plains",
		},
	];

	let actual = arrayGroupToMap(data);

	expect(actual).toMatchSnapshot();
	expect(sumGroup(actual)).toStrictEqual(data.length);

});
