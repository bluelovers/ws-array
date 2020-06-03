import { arrayChunkSplit, arrayChunkMap, arrayChunkBySize } from '../index';

describe(`arrayChunkSplit`, () =>
{

	test(`3`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkSplit(arr, 3);
		let expected = [[1, 2, 3], [4, 5, 6], [7, 8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`2`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkSplit(arr, 2);
		let expected = [[1, 2, 3, 4], [5, 6, 7, 8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`4`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkSplit(arr, 4);
		let expected = [[1, 2], [3, 4], [5, 6], [7, 8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`1`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkSplit(arr, 1);
		let expected = [[1, 2, 3, 4, 5, 6, 7, 8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`5 but will only get 4`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkSplit(arr, 5);
		let expected = arrayChunkSplit(arr, 4);

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`8`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkSplit(arr, 8);
		let expected = [[1], [2], [3], [4], [5], [6], [7], [8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`empty`, () =>
	{

		const arr = [];

		let actual = arrayChunkSplit(arr, 8);
		let expected = [];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`throw error`, () =>
	{
		expect(() => arrayChunkSplit([], 0)).toThrowError();
	})

})

describe(`arrayChunkBySize`, () =>
{

	test(`1`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkBySize(arr, 1);
		let expected = arrayChunkSplit(arr, arr.length);

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`4`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkBySize(arr, 4);
		let expected = arrayChunkSplit(arr, 2);

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`5`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkBySize(arr, 5);
		let expected = [[1, 2, 3, 4, 5], [6, 7, 8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`6`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkBySize(arr, 6);
		let expected = [[1, 2, 3, 4, 5, 6], [7, 8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`7`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkBySize(arr, 7);
		let expected = [[1, 2, 3, 4, 5, 6, 7], [8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`8`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkBySize(arr, 8);
		let expected = [[1, 2, 3, 4, 5, 6, 7, 8]];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`empty`, () =>
	{

		const arr = [];

		let actual = arrayChunkBySize(arr, 8);
		let expected = [];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`throw error`, () =>
	{
		expect(() => arrayChunkBySize([], 0)).toThrowError();
	})

});
