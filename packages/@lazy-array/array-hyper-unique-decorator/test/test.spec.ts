//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import { ArrayUniqueDecorator, ArrayUniqueAsyncDecorator } from '../src/index';

beforeAll(async () =>
{

});

describe('decorator', () =>
{

	class C1
	{
		@ArrayUniqueDecorator()
		sync1()
		{
			return ['a', 'b', 'c', 'a']
		}

		@ArrayUniqueDecorator({
			removeFromFirst: true,
		})
		sync2()
		{
			return ['a', 'b', 'c', 'a']
		}

		@ArrayUniqueAsyncDecorator()
		async async1()
		{
			return ['a', 'b', 'c', 'a']
		}

		@ArrayUniqueAsyncDecorator({
			removeFromFirst: true,
		})
		async async2()
		{
			return ['a', 'b', 'c', 'a']
		}
	}

	const c1 = new C1();

	test.skip(`dummy`, () => {});

	test.each([
		'sync1',
		'sync2',
	] as const)(`%s`, (method) =>
	{

		let actual = c1[method]();

		expect(actual).toMatchSnapshot();

	});

	test.each([
		'async1',
		'async2',
	] as const)(`%s`, (method) =>
	{

		let actual = c1[method]();

		expect(actual).resolves.toMatchSnapshot();

	});

})
