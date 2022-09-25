/**
 * Created by user on 2018/2/4/004.
 */

import { sortObject } from '../src/core';
import sortObject2 from '../';
import sortObject3 from '../index';
import sortObject4 from '../src/core';

sortObject([]);
sortObject2([]);
sortObject3([]);
sortObject4([]);

it(`sort object`, function ()
{
	let actual = sortObject({
		c: 1,
		b: 1,
		d: 1,
		a: 1,
	});

	let expected = {
		a: 1,
		b: 1,
		c: 1,
		d: 1,
	};

	expect(actual).toStrictEqual(expected);
	strictStringify(actual, expected);

	strictKeys(actual, expected);

	expect(Object.keys(actual)).toMatchSnapshot();
	expect(actual).toMatchSnapshot();
});

it('sort object v2', function ()
{
	let actual = sortObject({
		c: 1,
		b: 1,
		d: 1,
		a: 1,
	}, {
		keys: ['b', 'c', 'a', 'd'],
		onlyKeys: true,
	})

	expect(Object.keys(actual)).toStrictEqual(['b', 'c', 'a', 'd']);
	expect(Object.keys(actual)).toMatchSnapshot();
	expect(actual).toMatchSnapshot();
});

it(`source will not change order`, function ()
{
	let source = { a: 1, c: 2, e: 5, d: 4, b: 3 };
	let actual = sortObject(source, {
		keys: ['a', 'b'],
	});
	let expected = { a: 1, b: 3, c: 2, d: 4, e: 5 };

	expect(actual).toStrictEqual(expected);
	expect(actual).toStrictEqual(source);

	strictKeys(actual, source, true);
	strictKeys(actual, expected);

	expect(actual === source).toStrictEqual(false);

	expect(Object.keys(actual)).toMatchSnapshot();
	expect(actual).toMatchSnapshot();
});

it(`source will change order`, function ()
{
	let source = { a: 1, c: 2, e: 5, d: 4, b: 3 };
	let actual = sortObject(source, {
		keys: ['a', 'b'],
		useSource: true,
	});
	let expected = { a: 1, b: 3, c: 2, d: 4, e: 5 };

	expect(actual).toStrictEqual(expected);
	expect(actual).toStrictEqual(source);

	strictKeys(actual, source);
	strictKeys(actual, expected);

	expect(actual === source).toStrictEqual(true);

	expect(Object.keys(actual)).toMatchSnapshot();
	expect(actual).toMatchSnapshot();
});

it('should not add extra keys to object', function ()
{
	let actual = sortObject({
		b: 1,
		a: 1,
	}, ['a', 'b', 'c', 'd'])

	expect(Object.keys(actual)).toMatchSnapshot();
	expect(Object.keys(actual)).toStrictEqual([
		'a',
		'b',
	]);
	expect(actual).toMatchSnapshot();
});

it('should follow sort function', function ()
{
	let actual = sortObject({
		"key-1": 1,
		"key-3": 1,
		"key-10": 1,
		"key-2": 1,
	}, removeKeyAncCompareIndex)

	strictKeys(actual, {
		"key-1": 1,
		"key-2": 1,
		"key-3": 1,
		"key-10": 1,
	});

	expect(Object.keys(actual)).toMatchSnapshot();
	expect(actual).toMatchSnapshot();

	function removeKeyAncCompareIndex(keyA, keyB)
	{
		let a = parseInt(keyA.slice(4));
		let b = parseInt(keyB.slice(4));
		return a - b;
	}
});

it('should add extra keys to object', function ()
{
	let actual = sortObject({
		b: 1,
		a: 1,
	}, {
		keys: ['a', 'b', 'c', 'd'],
		allowNotExists: true,
	})

	expect(Object.keys(actual)).toMatchSnapshot();

	expect(Object.keys(actual)).toStrictEqual(['a', 'b', 'c', 'd']);
	expect(actual).toMatchSnapshot();
});

it('with onlyKeys', function ()
{
	let source = {
		c: 1,
		b: 1,
		d: 1,
		a: 1,
	};
	let actual = sortObject(source, {
		keys: ['b', 'd'],
		onlyKeys: true,
		useSource: true,
	})

	expect(Object.keys(actual)).toMatchSnapshot();
	expect(Object.keys(source)).toMatchSnapshot();

	expect(Object.keys(actual)).toStrictEqual(['b', 'd']);
	expect(Object.keys(source)).toStrictEqual(['c', 'b', 'd', 'a']);
	expect(actual).toMatchSnapshot();
});

it('with onlyKeys v2', function ()
{
	let source = {
		c: 1,
		b: 1,
		d: 1,
		a: 1,
	};

	expect(() => sortObject(source, {
		onlyKeys: true,
	})).toThrow()
});

it('with desc', function ()
{
	let actual = sortObject({
		c: 1,
		b: 1,
		d: 1,
		a: 1,
	}, {
		keys: ['b', 'c', 'a', 'd'],
		desc: true,
	})

	let keys = Object.keys(actual);
	expect(keys).toMatchSnapshot();

	expect(keys).toStrictEqual(['d', 'a', 'c', 'b']);
	expect(actual).toMatchSnapshot();
});

it('sort object v3', function ()
{
	let actual = sortObject({
		c: 1,
		b: 1,
		d: 1,
		a: 1,
	}, ['b', 'c', 'a', 'd'])

	expect(Object.keys(actual)).toStrictEqual(['b', 'c', 'a', 'd']);
	expect(Object.keys(actual)).toMatchSnapshot();
	expect(actual).toMatchSnapshot();
});

function strictStringify(actual, expected, not?: boolean)
{
	let ex = expect(JSON.stringify(actual))
	return (not ? ex.not : ex).toStrictEqual(JSON.stringify(expected));
}

function strictKeys(actual, expected, not?: boolean)
{
	let ex = expect(Object.keys(actual));
	return (not ? ex.not : ex).toStrictEqual(Object.keys(expected));
}
