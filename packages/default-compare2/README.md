# default-compare-with-symbol

基本排序演算法，行為類似 Array.prototype.sort 對 null 和 undefined 的處理，同時支援 Symbol 類型。

Basic sort algorithm with similar behavior to Array.prototype.sort for null and undefined, also supports Symbol type.

## 功能說明 / Features

- **defaultCompare**: 預設比較函式，支援 null、undefined 和 Symbol
- **defaultCompareBasic**: 基本比較函式，支援 null、undefined 和數字
- **arraySortWithSymbol**: 對陣列進行排序並支援 Symbol
- 核心比較函式：nullCompare, numberCompare, symbolCompare, dateCompare

## 安裝 / Install

```bash
yarn add default-compare-with-symbol
yarn-tool add default-compare-with-symbol
yt add default-compare-with-symbol
```

## 使用範例 / Usage Examples

### 基本使用 / Basic Usage

```typescript
import defaultCompare from 'default-compare-with-symbol';

const arr = [3, 1, 2, null, undefined, 0];
arr.sort(defaultCompare);

console.log(arr); // => [0, 1, 2, 3, null, undefined]
```

### 處理混合類型 / Handling Mixed Types

```typescript
import defaultCompare from 'default-compare-with-symbol';

const mixed = [Symbol('a'), 5, 'z', null, undefined, 1, Symbol('b')];
mixed.sort(defaultCompare);

console.log(mixed);
// => [null, undefined, 1, 5, 'z', Symbol(a), Symbol(b)]
```

### 使用 arraySortWithSymbol / Using arraySortWithSymbol

```typescript
import { arraySortWithSymbol } from 'default-compare-with-symbol';

const data = [
  { id: Symbol('b'), value: 2 },
  { id: Symbol('a'), value: 1 },
  { id: 1, value: 3 }
];

arraySortWithSymbol(data as any);
console.log(data);
// => [{id: 1, value: 3}, {id: Symbol(a), value: 1}, {id: Symbol(b), value: 2}]
```

### 日期比較 / Date Comparison

```typescript
import { dateCompare } from 'default-compare-with-symbol';

const dates = [
  new Date('2023-01-01'),
  new Date('2023-03-01'),
  new Date('2023-02-01')
];

dates.sort(dateCompare);
console.log(dates);
// => [2023-01-01, 2023-02-01, 2023-03-01]
```

### 本地化字串比較 / Locale String Comparison

```typescript
import { stringCompareLocale } from 'default-compare-with-symbol';

const strings = ['banana', 'Apple', 'cherry'];
strings.sort(stringCompareLocale);

console.log(strings); // => ['Apple', 'banana', 'cherry']
```

## 應用情境 / Application Scenarios

1. **穩定排序**: 確保 null、undefined 值始終在陣列末尾
2. **Symbol 處理**: 正確排序包含 Symbol 的資料
3. **混合資料**: 處理包含多種原始類型的陣列
4. **自訂物件**: 為具有複雜結構的物件提供基礎排序

## 與 Array.prototype.sort 的差異

此套件提供類似 Array.prototype.sort 的預設行為，但：
- null 會被視為最小值
- undefined 會被視為最小值（在 null 之後）
- Symbol 會被視為最大值（在所有類型之後）

## API 參考 / API Reference

```typescript
function defaultCompare(a: unknown, b: unknown): number
function defaultCompareBasic(a: unknown, b: unknown): number
function arraySortWithSymbol<T extends any[]>(arr: T): T

// Core functions
function numberCompare(a: unknown, b: unknown): number
function nullCompare(a: unknown, b: unknown): number | undefined
function symbolCompare(a: unknown, b: unknown): number
function dateCompare(a: Date, b: Date): number
function stringCompareLocale(a: string, b: string): number
```

[查看完整 API](index.d.ts)
