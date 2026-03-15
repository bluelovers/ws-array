# array-group-to-record

將陣列元素依據自訂鍵分組為 Record 或 Map，支援 hash-sum 自動鍵生成。

Group array elements by custom key into Record or Map, supporting hash-sum auto key generation.

## 功能說明 / Features

- **arrayGroupToRecord**: 將陣列分組為 Record
- **arrayGroupToMap**: 將陣列分組為 Map
- **sumGroup**: 計算分組後的總元素數量
- **handleOptions**: 處理選項並回填預設值

## 安裝 / Install

```bash
yarn add array-group-to-record
yarn-tool add array-group-to-record
yt add array-group-to-record
```

## 使用範例 / Usage Examples

### 基本使用 / Basic Usage

```typescript
import { arrayGroupToRecord } from 'array-group-to-record';

// 根據字串長度分組
const result = arrayGroupToRecord(['a', 'b', 'ab', 'abc'], {
  getKey: (item) => String(item.length)
});

console.log(result);
// => { '1': ['a', 'b'], '2': ['ab'], '3': ['abc'] }
```

### 物件分組 / Object Grouping

```typescript
import { arrayGroupToRecord } from 'array-group-to-record';

const data = [
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'veg', name: 'carrot' },
  { type: 'veg', name: 'potato' }
];

const grouped = arrayGroupToRecord(data, {
  getKey: (item) => item.type
});

console.log(grouped);
// => {
//   fruit: [
//     { type: 'fruit', name: 'apple' },
//     { type: 'fruit', name: 'banana' }
//   ],
//   veg: [
//     { type: 'veg', name: 'carrot' },
//     { type: 'veg', name: 'potato' }
//   ]
// }
```

### 使用 Map / Using Map

```typescript
import { arrayGroupToMap } from 'array-group-to-record';

const result = arrayGroupToMap([1, 2, 3, 4, 5], {
  getKey: (item) => item % 2 === 0 ? 'even' : 'odd'
});

console.log(result);
// => Map { 'odd' => [1, 3, 5], 'even' => [2, 4] }
```

### 自動鍵生成 / Auto Key Generation

```typescript
import { arrayGroupToRecord } from 'array-group-to-record';

// 不提供 getKey 時，使用 hash-sum 自動生成鍵
const objects = [
  { id: 1, value: 'a' },
  { id: 1, value: 'b' },
  { id: 2, value: 'c' }
];

const grouped = arrayGroupToRecord(objects);
console.log(grouped);
// 自動根據物件內容生成唯一鍵
```

### 計算總數 / Calculate Total Count

```typescript
import { arrayGroupToRecord, sumGroup } from 'array-group-to-record';

const grouped = arrayGroupToRecord(['a', 'b', 'ab', 'abc'], {
  getKey: (item) => String(item.length)
});

const total = sumGroup(grouped);
console.log(total); // => 4
```

## 應用情境 / Application Scenarios

1. **資料分類**: 根據物件屬性將資料分組
2. **統計分析**: 計算各分類的數量
3. **資料轉換**: 將陣列轉換為查找表 (Lookup Table)
4. **近似重複檢測**: 使用 hash-sum 識別相似物件

## API 參考 / API Reference

```typescript
function arrayGroupToRecord<T>(
  arr: T[],
  options?: IOptionsForRecord<T>
): Record<string, T[]>

function arrayGroupToMap<T>(
  arr: T[],
  options?: IOptionsForMap<T>
): Map<any, T[]>

function sumGroup<T extends Record<any, any[]> | Map<any, any[]>>(group: T): number
```

[查看完整 API](index.d.ts)
