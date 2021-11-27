import distributeGroupToArray from '../src/index';

test(`distributeGroupToArray`, () =>
{
	let data = {
		"18056a75": [
			{
				"name": "Forest",
			},
			{
				"name": "Forest",
			},
			{
				"name": "Forest",
			},
		],
		"57a555ae": [
			{
				"name": "Plains",
			},
			{
				"name": "Plains",
			},
			{
				"name": "Plains",
			},
		],
	};

	let actual = distributeGroupToArray(data);

	expect(actual).toMatchSnapshot();

});
