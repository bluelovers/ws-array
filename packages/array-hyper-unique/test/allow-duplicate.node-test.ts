/**
 * `allowDuplicate` 選項測試
 * Tests for the `allowDuplicate` option
 *
 * 執行 / Run: node --run test:node
 */

import assert from 'node:assert/strict';
import { describe, it, TestContext } from 'node:test';

import { array_unique, array_unique_overwrite } from '../src/index';
import type { TDefaultFilterOptions } from '../src/index';

const lines = Object.freeze([
	'# a',
	'*.log',
	'*.log',
	'',
	'# b',
	'',
	'*.log',
	'',
]);

describe('allowDuplicate', () =>
{
	it('預設行為：所有重複項都會被移除', (t: TestContext) =>
	{
		const actual = array_unique([...lines]);

		t.assert.deepEqual(actual, [
			'# a',
			'*.log',
			'',
			'# b',
		]);
		t.assert.snapshot(actual);
	});

	it("以 callback 允許 '' 重複", (t: TestContext) =>
	{
		const actual = array_unique([...lines], {
			allowDuplicate: (v) => v === '',
		});

		t.assert.deepEqual(actual, [
			'# a',
			'*.log',
			'',
			'# b',
			'',
			'',
		]);
		t.assert.snapshot(actual);
	});

	it('callback 會收到 value / index / arr', (t: TestContext) =>
	{
		const calls: Array<{ v: unknown, index: number, arr: string[] }> = [];

		array_unique([...lines], {
			allowDuplicate(v, index, arr)
			{
				calls.push({ v, index, arr });

				return v === '';
			},
		});

		t.assert.equal(calls.length, lines.length);
		t.assert.deepEqual(calls.map(c => c.index), [0, 1, 2, 3, 4, 5, 6, 7]);
		t.assert.deepEqual(calls.map(c => c.v), [...lines]);
		t.assert.ok(calls.every(c => c.arr.length === lines.length));

		t.assert.snapshot(calls);
	});

	it('可依條件允許非空字串重複', (t: TestContext) =>
	{
		const actual = array_unique([...lines], {
			allowDuplicate: (v: string) => v.startsWith('*'),
		});

		t.assert.deepEqual(actual, [
			'# a',
			'*.log',
			'*.log',
			'',
			'# b',
			'*.log',
		]);

		t.assert.snapshot(actual);
	});

	it('條件全數符合時可完整保留原始陣列', (t: TestContext) =>
	{
		const actual = array_unique([...lines], {
			allowDuplicate: (v: string) => v === '' || v === '*.log',
		});

		t.assert.deepEqual(actual, [...lines]);

		t.assert.snapshot(actual);
	});

	it('overwrite 模式同樣生效', (t: TestContext) =>
	{
		const input = [...lines];
		const actual = array_unique_overwrite(input, {
			allowDuplicate: (v) => v === '',
		});

		t.assert.equal(actual, input);
		t.assert.deepEqual(actual, [
			'# a',
			'*.log',
			'',
			'# b',
			'',
			'',
		]);

		t.assert.snapshot(actual);
	});

	it('removeFromFirst（保留最後一次）搭配 allowDuplicate', (t: TestContext) =>
	{
		const before = array_unique([...lines], {
			removeFromFirst: true,
		});

		t.assert.deepEqual(before, [
			'# a',
			'# b',
			'*.log',
			'',
		]);

		t.assert.snapshot(before);

		const actual = array_unique([...lines], {
			removeFromFirst: true,
			allowDuplicate: (v) => v === '',
		});

		t.assert.deepEqual(actual, [
			'# a',
			'',
			'# b',
			'',
			'*.log',
			'',
		]);

		t.assert.snapshot(actual);
	});

	it('filter 仍然會限制被允許重複的值', (t: TestContext) =>
	{
		const actual = array_unique([...lines], {
			filter: (v: string) => v !== '',
			allowDuplicate: (v) => v === '',
		});

		t.assert.deepEqual(actual, [
			'# a',
			'*.log',
			'# b',
		]);

		t.assert.snapshot(actual);
	});

	it('物件去重搭配 allowDuplicate', (t: TestContext) =>
	{
		const data = [
			{ id: 1 },
			{ id: 1 },
			{ id: 2 },
			{ id: 2 },
		];

		const actual = array_unique([...data], {
			allowDuplicate: (v: { id: number }) => v.id === 2,
		});

		t.assert.deepEqual(actual, [
			{ id: 1 },
			{ id: 2 },
			{ id: 2 },
		]);

		t.assert.snapshot(actual);
	});

	it('不使用選項時不會修改原始陣列', (t: TestContext) =>
	{
		const input = [...lines];

		array_unique(input, {
			allowDuplicate: (v) => v === '',
		});

		t.assert.deepEqual(input, [...lines]);

		t.assert.snapshot(input);
	});
});

describe('allowDuplicate + checker', () =>
{
	const mixed = Object.freeze([
		'*.log',
		'*.LOG',
		'',
		'',
		'*.Log',
		'',
	]);

	// 不分大小寫的自訂 checker，用來驗證 checker 與 allowDuplicate 的交互關係
	// elementA/indexA 是「正在被檢查」的元素，elementB/indexB 是 find 掃描到的候選位置
	const ciChecker = (elementA: any, elementB: any) => elementA.toLowerCase() === elementB.toLowerCase();

	it('自訂 checker 決定唯一性（不分大小寫）', (t: TestContext) =>
	{
		const actual = array_unique([...mixed], {
			checker: ciChecker,
		});

		t.assert.deepEqual(actual, [
			'*.log',
			'',
		]);

		t.assert.snapshot(actual);
	});

	it("checker 搭配 allowDuplicate：只放行 ''", (t: TestContext) =>
	{
		const actual = array_unique([...mixed], {
			checker: ciChecker,
			allowDuplicate: (v) => v === '',
		});

		t.assert.deepEqual(actual, [
			'*.log',
			'',
			'',
			'',
		]);

		t.assert.snapshot(actual);
	});

	it("allowDuplicate 優先於 checker：'*.LOG' 被放行", (t: TestContext) =>
	{
		const actual = array_unique([...mixed], {
			checker: ciChecker,
			allowDuplicate: (v) => v === '*.LOG',
		});

		t.assert.deepEqual(actual, [
			'*.log',
			'*.LOG',
			'',
		]);

		t.assert.snapshot(actual);
	});

	it('removeFromFirst + checker + allowDuplicate', (t: TestContext) =>
	{
		const actual = array_unique([...mixed], {
			checker: ciChecker,
			removeFromFirst: true,
			allowDuplicate: (v) => v === '',
		});

		t.assert.deepEqual(actual, [
			'',
			'',
			'*.Log',
			'',
		]);

		t.assert.snapshot(actual);
	});

	it('allowDuplicate 為 true 時會略過 checker', (t: TestContext) =>
	{
		const input = [...mixed];
		const calls: Array<{
			elementA: string,
			elementB: string,
			indexA: number,
			indexB: number,
			arrIsInput: boolean,
		}> = [];

		array_unique(input, {
			checker(elementA: any, elementB: any, indexA: any, indexB: any, arr: any)
			{
				calls.push({
					elementA: String(elementA),
					elementB: String(elementB),
					indexA,
					indexB,
					arrIsInput: arr === input,
				});

				return ciChecker(elementA, elementB);
			},
			allowDuplicate: (v) => v === '',
		});

		// 以 '' 為目標的唯一性判斷完全不會發生（被 allowDuplicate 略過）
		t.assert.equal(calls.filter(c => c.elementA === '').length, 0);

		// 沒有被放行的值，仍然會透過 checker 做唯一性判斷
		t.assert.ok(calls.some(c => c.elementA === '*.log'));
		t.assert.ok(calls.some(c => c.elementA === '*.LOG'));
		t.assert.ok(calls.some(c => c.elementA === '*.Log'));

		// elementA / elementB 恆為陣列中的元素，且分別對應 indexA / indexB
		t.assert.ok(calls.every(c => input[c.indexA] === c.elementA));
		t.assert.ok(calls.every(c => input[c.indexB] === c.elementB));

		// findIndex 由頭開始掃描、遇到第一個相同值即停止，所以 indexB 不會超過 indexA
		t.assert.ok(calls.every(c => c.indexB <= c.indexA));

		// checker 取得的 arr 是原始陣列
		t.assert.ok(calls.length > 0);
		t.assert.ok(calls.every(c => c.arrIsInput));

		// elementA 依序為三個未被放行的值，elementB/indexB 是各自第一個相同值的位置
		t.assert.deepEqual(calls, [
			{ elementA: '*.log', elementB: '*.log', indexA: 0, indexB: 0, arrIsInput: true },
			{ elementA: '*.LOG', elementB: '*.log', indexA: 1, indexB: 0, arrIsInput: true },
			{ elementA: '*.Log', elementB: '*.log', indexA: 4, indexB: 0, arrIsInput: true },
		]);

		t.assert.snapshot(calls);
	});

	it('checker 依序收到 elementA / elementB / indexA / indexB（findIndex 由頭掃描）', (t: TestContext) =>
	{
		const input = ['x', 'y', 'X'];
		const calls: Array<{ elementA: string, elementB: string, indexA: number, indexB: number }> = [];

		const actual = array_unique([...input], {
			checker(elementA: any, elementB: any, indexA: any, indexB: any)
			{
				calls.push({ elementA, elementB, indexA, indexB });

				return ciChecker(elementA, elementB);
			},
		});

		// 每個 elementA 都由 indexB=0 開始比對，直到第一個相同值（或比完）才停
		t.assert.deepEqual(calls, [
			{ elementA: 'x', elementB: 'x', indexA: 0, indexB: 0 },
			{ elementA: 'y', elementB: 'x', indexA: 1, indexB: 0 },
			{ elementA: 'y', elementB: 'y', indexA: 1, indexB: 1 },
			{ elementA: 'X', elementB: 'x', indexA: 2, indexB: 0 },
		]);

		// 'X' 的相同值在 indexB=0（不分大小寫），i=0 !== indexA=2，因此被移除
		t.assert.deepEqual(actual, ['x', 'y']);

		t.assert.snapshot(calls);
	});

	it('checker 依序收到 elementA / elementB / indexA / indexB（removeFromFirst 改由尾掃描）', (t: TestContext) =>
	{
		const input = ['x', 'y', 'X'];
		const calls: Array<{ elementA: string, elementB: string, indexA: number, indexB: number }> = [];

		const actual = array_unique([...input], {
			checker(elementA: any, elementB: any, indexA: any, indexB: any)
			{
				calls.push({ elementA, elementB, indexA, indexB });

				return ciChecker(elementA, elementB);
			},
			removeFromFirst: true,
		});

		// findLastIndex 由尾開始掃描，所以 indexB 從最後一個索引往回
		t.assert.deepEqual(calls, [
			{ elementA: 'x', elementB: 'X', indexA: 0, indexB: 2 },
			{ elementA: 'y', elementB: 'X', indexA: 1, indexB: 2 },
			{ elementA: 'y', elementB: 'y', indexA: 1, indexB: 1 },
			{ elementA: 'X', elementB: 'X', indexA: 2, indexB: 2 },
		]);

		// 以最後一次出現為基準：'x' 的相同值在 indexB=2，i=2 !== indexA=0，因此被移除
		t.assert.deepEqual(actual, ['y', 'X']);

		t.assert.snapshot(calls);
	});

	it('allowDuplicate 全部放行時完全不會呼叫 checker', (t: TestContext) =>
	{
		let called = 0;

		const actual = array_unique([...mixed], {
			checker()
			{
				called++;

				return false;
			},
			allowDuplicate: () => true,
		});

		t.assert.deepEqual(actual, [...mixed]);
		t.assert.equal(called, 0);

		t.assert.snapshot(actual);
	});
});

describe('runtimeCache', () =>
{
	it('runtimeCache 會傳入每個 callback 且為同一個實例', (t: TestContext) =>
	{
		const seen: Array<{ name: string, cache?: TDefaultFilterOptions<string[]> }> = [];

		const actual = array_unique([...lines], {
			checker(elementA, elementB, indexA, indexB, arr, runtimeCache)
			{
				seen.push({ name: 'checker', cache: runtimeCache });

				return elementA === elementB;
			},
			filter(v, index, arr, runtimeCache)
			{
				seen.push({ name: 'filter', cache: runtimeCache });

				return true;
			},
			allowDuplicate(v, index, arr, runtimeCache)
			{
				seen.push({ name: 'allowDuplicate', cache: runtimeCache });

				return v === '';
			},
		});

		t.assert.deepEqual(actual, [
			'# a',
			'*.log',
			'',
			'# b',
			'',
			'',
		]);

		t.assert.ok(seen.length > 0);

		// 三個 callback 都有收到 runtimeCache
		t.assert.deepEqual([
			'checker',
			'filter',
			'allowDuplicate',
		].filter(name => seen.some(s => s.name === name)), [
			'checker',
			'filter',
			'allowDuplicate',
		]);

		const caches = seen.map(s => s.cache);

		// 各 callback 取得的都是同一個 runtimeCache 實例
		t.assert.ok(caches.every(c => c === caches[0]));

		// 內含已解析的 checker / filter / allowDuplicate 與 find
		t.assert.ok(caches.every(c => typeof c?.checker === 'function'));
		t.assert.ok(caches.every(c => typeof c?.filter === 'function'));
		t.assert.ok(caches.every(c => typeof c?.allowDuplicate === 'function'));
		t.assert.ok(caches.every(c => typeof c?.find === 'function'));

		t.assert.snapshot(actual);
	});
});
