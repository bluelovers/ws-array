import naturalCompare, { createNew } from '../core';

test(`number`, () =>
{
	let arr = [1, 5, 4];

	let actual = arr.sort(naturalCompare);

	expect(actual).toStrictEqual([1, 4, 5]);

	expect(actual).toMatchSnapshot();

});

test(`desc`, () =>
{
	let arr = [1, 5, '4'];

	let actual = arr.sort(createNew({
		desc: true,
	}));

	expect(actual).toStrictEqual([5, '4', 1]);

	expect(actual).toMatchSnapshot();

});
