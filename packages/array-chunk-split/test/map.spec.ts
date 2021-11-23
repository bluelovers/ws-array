import { arrayChunkMap } from '../src/index';

describe(`arrayChunkMap`, () =>
{

	test(`default`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkMap({
			inputArray: arr,
			maxChunkLength: 2,
		});
		let expected = [ 1, 5 ];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`mapMethod:true`, () =>
	{

		const arr = [1, 2, 3, 4, 5, 6, 7, 8];

		let actual = arrayChunkMap({
			inputArray: arr,
			maxChunkLength: 2,
			mapMethod: true,
		});
		let expected = [ 4, 8 ];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`maxChunkSize`, () =>
	{

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

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`throw error`, () =>
	{
		expect(() => arrayChunkMap({
			inputArray: [],
		} as any)).toThrowError();
	})

})
