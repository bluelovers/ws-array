# sort-object-keys2

對物件的鍵進行排序，支援自訂排序函式、指定鍵順序和原地修改選項。

Sort object keys with custom sort functions, specified key order, and in-place modification options.

## 功能說明 / Features

- **基本排序**: 依字母順序排序物件鍵
- **自訂排序**: 使用自訂排序函式
- **指定鍵順序**: 指定特定鍵的排列順序
- **原地修改**: 可選擇直接修改原物件
- **Basic sorting**: Sort keys alphabetically
- **Custom sorting**: Use custom sort functions
- **Specified key order**: Specify particular key order
- **In-place modification**: Option to modify source object directly

## 安裝 / Install

```bash
yarn add sort-object-keys2
yarn-tool add sort-object-keys2
yt add sort-object-keys2
```

## 使用範例 / Usage Examples

### 基本排序 / Basic Sorting

```typescript
import { sortObjectKeys } from 'sort-object-keys2';

// 依鍵名字母順序排序
const obj = { c: 1, b: 2, a: 3 };
const sorted = sortObjectKeys(obj);

console.log(sorted); // => { a: 3, b: 2, c: 1 }
```

### 指定鍵順序 / Specify Key Order

```typescript
import { sortObjectKeys } from 'sort-object-keys2';

// 指定鍵的優先順序
const obj = { c: 1, b: 2, a: 3 };
const sorted = sortObjectKeys(obj, ['b', 'a', 'c']);

console.log(sorted); // => { b: 2, a: 3, c: 1 }
```

### 自訂排序函式 / Custom Sort Function

```typescript
import { sortObjectKeys } from 'sort-object-keys2';

// 自然排序數字鍵
const obj = { key2: 1, key10: 1, key1: 1 };
const sorted = sortObjectKeys(obj, (a, b) => {
  return a.localeCompare(b, undefined, { numeric: true });
});

console.log(sorted); // => { key1: 1, key2: 1, key10: 1 }
```

### 降序排列 / Descending Order

```typescript
import { sortObjectKeys } from 'sort-object-keys2';

const obj = { a: 1, b: 2, c: 3 };
const sorted = sortObjectKeys(obj, { desc: true });

console.log(sorted); // => { c: 3, b: 2, a: 1 }
```

### 只返回指定鍵 / Return Only Specified Keys

```typescript
import { sortObjectKeys } from 'sort-object-keys2';

const obj = { a: 1, b: 2, c: 3 };
const sorted = sortObjectKeys(obj, { keys: ['b', 'c'], onlyKeys: true });

console.log(sorted); // => { b: 2, c: 3 }
```

### 原地修改 / In-place Modification

```typescript
import { sortObjectKeys } from 'sort-object-keys2';

const obj = { c: 1, b: 2, a: 3 };
sortObjectKeys(obj, { useSource: true });

console.log(obj); // => { a: 3, b: 2, c: 1 }
```

### 允許不存在的鍵 / Allow Non-existent Keys

```typescript
import { sortObjectKeys } from 'sort-object-keys2';

const obj = { a: 1, b: 2 };
const sorted = sortObjectKeys(obj, { keys: ['b', 'c', 'a'], allowNotExists: true });

console.log(sorted); // => { b: 2, c: undefined, a: 1 }
```

## 應用情境 / Application Scenarios

1. **測試穩定性**: 確保物件結構穩定以便比對
2. **API 響應**: 產生一致且可預測的 JSON 響應
3. **表單欄位**: 自訂表單欄位的顯示順序
4. **配置管理**: 排序配置物件以便閱讀

## API 參考 / API Reference

```typescript
declare function sortObject<T>(object: T, options?: sortObject.IOptions & {
    useSource: true;
}): T;
declare function sortObject<T>(object: T, options?: sortObject.IOptions & {
    keys: string[];
    onlyKeys: true;
}): Partial<T>;
declare function sortObject<T>(object: T, options?: sortObject.IOptions): Partial<T>;
declare function sortObject<T>(object: T, sortFn: (a, b) => any): Partial<T>;
declare function sortObject<T>(object: T, sortWith: string[]): Partial<T>;
```

[查看完整 API](index.d.ts)
