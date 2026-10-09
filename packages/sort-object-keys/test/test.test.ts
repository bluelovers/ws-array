/**
 * `sortObjectKeys` 測試（Node.js 原生測試）
 * Tests for `sortObjectKeys` (Node.js native test runner)
 *
 * 執行 / Run: node --run test:node
 *
 * 說明：`test:node` 帶有 `--test-update-snapshots`，快照會自我更新，
 * 因此除了 `t.assert.snapshot` 之外另外以 `deepStrictEqual` 釘住預期值，
 * 才能在行為改變時真正失敗。
 */

import { describe, it, TestContext } from 'node:test';

import { sortObjectKeys as sortObject } from '../src';

describe('sortObjectKeys', () =>
{
	it('傳入陣列不會拋錯', (t: TestContext) =>
	{
		// 原本在模組載入時直接呼叫的煙霧測試；空陣列沒有任何 key，回傳空物件
		const actual = sortObject([] as any);

		t.assert.deepStrictEqual(actual, {});
	});

	it(`sort object`, (t: TestContext) =>
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

		t.assert.deepStrictEqual(actual, expected);
		strictStringify(t, actual, expected);

		strictKeys(t, actual, expected);

		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(actual);
	});

	it('sort object v2', (t: TestContext) =>
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

		t.assert.deepStrictEqual(Object.keys(actual), ['b', 'c', 'a', 'd']);
		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(actual);
	});

	it(`source will not change order`, (t: TestContext) =>
	{
		let source = { a: 1, c: 2, e: 5, d: 4, b: 3 };
		let actual = sortObject(source, {
			keys: ['a', 'b'],
		});
		let expected = { a: 1, b: 3, c: 2, d: 4, e: 5 };

		t.assert.deepStrictEqual(actual, expected);
		t.assert.deepStrictEqual(actual, source);

		// 未使用 useSource：回傳新物件，key 順序已重排，與來源不同
		strictKeys(t, actual, source, true);
		strictKeys(t, actual, expected);

		t.assert.notStrictEqual(actual, source);

		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(actual);
	});

	it(`source will change order`, (t: TestContext) =>
	{
		let source = { a: 1, c: 2, e: 5, d: 4, b: 3 };
		let actual = sortObject(source, {
			keys: ['a', 'b'],
			useSource: true,
		});
		let expected = { a: 1, b: 3, c: 2, d: 4, e: 5 };

		t.assert.deepStrictEqual(actual, expected);
		t.assert.deepStrictEqual(actual, source);

		// useSource：直接改寫原物件並回傳同一個參照
		strictKeys(t, actual, source);
		strictKeys(t, actual, expected);

		t.assert.strictEqual(actual, source);

		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(actual);
	});

	it('should not add extra keys to object', (t: TestContext) =>
	{
		let actual = sortObject({
			b: 1,
			a: 1,
		}, ['a', 'b', 'c', 'd'])

		t.assert.snapshot(Object.keys(actual));
		// 預設不會補上不存在的 key
		t.assert.deepStrictEqual(Object.keys(actual), [
			'a',
			'b',
		]);
		t.assert.snapshot(actual);
	});

	it('should follow sort function', (t: TestContext) =>
	{
		let actual = sortObject({
			"key-1": 1,
			"key-3": 1,
			"key-10": 1,
			"key-2": 1,
		}, removeKeyAncCompareIndex)

		strictKeys(t, actual, {
			"key-1": 1,
			"key-2": 1,
			"key-3": 1,
			"key-10": 1,
		});

		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(actual);

		function removeKeyAncCompareIndex(keyA, keyB)
		{
			let a = parseInt(keyA.slice(4));
			let b = parseInt(keyB.slice(4));
			return a - b;
		}
	});

	it('should add extra keys to object', (t: TestContext) =>
	{
		let actual = sortObject({
			b: 1,
			a: 1,
		}, {
			keys: ['a', 'b', 'c', 'd'],
			allowNotExists: true,
		})

		t.assert.snapshot(Object.keys(actual));

		t.assert.deepStrictEqual(Object.keys(actual), ['a', 'b', 'c', 'd']);
		t.assert.snapshot(actual);
	});

	it('with onlyKeys', (t: TestContext) =>
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

		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(Object.keys(source));

		// onlyKeys 會停用 useSource，因此只回傳指定的 key，且不動到 source
		t.assert.deepStrictEqual(Object.keys(actual), ['b', 'd']);
		t.assert.deepStrictEqual(Object.keys(source), ['c', 'b', 'd', 'a']);
		t.assert.snapshot(actual);
	});

	it('with onlyKeys v2', (t: TestContext) =>
	{
		let source = {
			c: 1,
			b: 1,
			d: 1,
			a: 1,
		};

		// onlyKeys 但未提供 keys，會拋出 ReferenceError
		t.assert.throws(() => sortObject(source, {
			onlyKeys: true,
		}), ReferenceError)
	});

	it('with desc', (t: TestContext) =>
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
		t.assert.snapshot(keys);

		// desc 會把 keys 整個反轉，因此順序為指定順序的逆序
		t.assert.deepStrictEqual(keys, ['d', 'a', 'c', 'b']);
		t.assert.snapshot(actual);
	});

	it('sort object v3', (t: TestContext) =>
	{
		let actual = sortObject({
			c: 1,
			b: 1,
			d: 1,
			a: 1,
		}, ['b', 'c', 'a', 'd'])

		t.assert.deepStrictEqual(Object.keys(actual), ['b', 'c', 'a', 'd']);
		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(actual);
	});

	it('readonly', (t: TestContext) =>
	{
		let actual = sortObject({
			c: 1,
			b: 1,
			d: 1,
			a: 1,
		}, Object.freeze(['b', 'c', 'a', 'd']))

		t.assert.deepStrictEqual(Object.keys(actual), ['b', 'c', 'a', 'd']);
		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(actual);
	});

	it('extra keys', (t: TestContext) =>
	{
		let actual = sortObject({
			b: 1,
			a: 1,
		}, ['a', 'b', 'c', 'd'])

		t.assert.deepStrictEqual(Object.keys(actual), ['a', 'b']);
		t.assert.snapshot(Object.keys(actual));
		t.assert.snapshot(actual);
	});
});

function strictStringify(t: TestContext, actual: unknown, expected: unknown, not?: boolean)
{
	let a = JSON.stringify(actual);
	let b = JSON.stringify(expected);

	if (not)
	{
		t.assert.notStrictEqual(a, b);
	}
	else
	{
		t.assert.strictEqual(a, b);
	}
}

function strictKeys(t: TestContext, actual: object, expected: object, not?: boolean)
{
	if (not)
	{
		t.assert.notDeepStrictEqual(Object.keys(actual), Object.keys(expected));
	}
	else
	{
		t.assert.deepStrictEqual(Object.keys(actual), Object.keys(expected));
	}
}
