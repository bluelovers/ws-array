/**
 * `ArrayUniqueDecorator` / `ArrayUniqueAsyncDecorator` 測試（Node.js 原生測試）
 * Tests for the sync/async array-unique decorators (Node.js native test runner)
 *
 * 執行 / Run: node --run test:node
 *
 * 說明：`test:node` 帶有 `--test-update-snapshots`，快照會自我更新，
 * 因此除了 `t.assert.snapshot` 之外另外以 `t.assert.deepEqual` 釘住預期值，
 * 才能在行為改變時真正失敗。
 */

import { describe, it, TestContext } from 'node:test';

import { ArrayUniqueDecorator, ArrayUniqueAsyncDecorator } from '../src/index';

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

	/**
	 * 同步方法的預期結果：以第一次出現為基準（預設）vs 以最後一次出現為基準（removeFromFirst）
	 * Expected results of the sync methods: keyed by the first occurrence (default) vs the last (removeFromFirst)
	 */
	const syncCases = [
		['sync1', ['a', 'b', 'c']],
		['sync2', ['b', 'c', 'a']],
	] as const;

	for (const [method, expected] of syncCases)
	{
		it(method, (t: TestContext) =>
		{
			const actual = c1[method]();

			// 原始回傳值為 ['a', 'b', 'c', 'a']，裝飾器會在回傳前去重
			t.assert.deepEqual(actual, [...expected]);

			t.assert.snapshot(actual);
		});
	}

	/**
	 * 異步方法的預期結果，與同步版本一致；差別在於去重發生在 Promise 解析之後
	 * Expected results of the async methods, same as the sync counterparts;
	 * the difference is that deduplication happens after the Promise resolves
	 */
	const asyncCases = [
		['async1', ['a', 'b', 'c']],
		['async2', ['b', 'c', 'a']],
	] as const;

	for (const [method, expected] of asyncCases)
	{
		it(method, async (t: TestContext) =>
		{
			const actual = await c1[method]();

			t.assert.deepEqual(actual, [...expected]);

			t.assert.snapshot(actual);
		});
	}

	it('同步與異步裝飾器在相同選項下結果一致', async (t: TestContext) =>
	{
		// 預設選項
		t.assert.deepEqual(await c1.async1(), c1.sync1());

		// removeFromFirst
		t.assert.deepEqual(await c1.async2(), c1.sync2());
	});

	it('removeFromFirst 保留最後一次出現的位置', async (t: TestContext) =>
	{
		// 'a' 出現在 index 0 與 3；removeFromFirst 以 findLastIndex 為基準，故保留最後的 'a' 並移到結尾
		t.assert.deepEqual(c1.sync2(), ['b', 'c', 'a']);
		t.assert.deepEqual(await c1.async2(), ['b', 'c', 'a']);
	});
});
