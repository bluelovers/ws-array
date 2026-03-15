# @lazy-array/util-unique

提供陣列去重的工具函式，包含兩種實現方式。

Provides array deduplication utilities with two implementation methods.

## 功能說明 / Features

- **array_unique_indexOf**: 使用 indexOf 過濾方式取得唯一值 / Get unique values using indexOf filter
- **array_unique_by_set**: 使用 Set 資料結構取得唯一值 / Get unique values using Set data structure

## 安裝 / Install

```bash
yarn add @lazy-array/util-unique
yarn-tool add @lazy-array/util-unique
yt add @lazy-array/util-unique
```

## 使用範例 / Usage Examples

### array_unique_indexOf

使用 indexOf 過濾，保留第一個出現的元素。

Uses indexOf filter, keeping the first occurrence of each element.

```typescript
import { array_unique_indexOf } from '@lazy-array/util-unique';

// 基本使用
const result = array_unique_indexOf([1, 2, 2, 3]);
console.log(result); // => [1, 2, 3]

// 字串陣列
const strings = array_unique_indexOf(['a', 'b', 'a', 'c']);
console.log(strings); // => ['a', 'b', 'c']
```

### array_unique_by_set

使用 Set 資料結構，高效能去重。

Uses Set for high-performance deduplication.

```typescript
import { array_unique_by_set } from '@lazy-array/util-unique';

const result = array_unique_by_set([1, 2, 2, 3]);
console.log(result); // => [1, 2, 3]

const objects = array_unique_by_set([{a: 1}, {a: 1}, {b: 2}]);
console.log(objects); // => [{a: 1}, {a: 1}, {b: 2}] - 物件無法透過 Set 去重 / Objects cannot be deduplicated by Set
```

## 應用情境 / Application Scenarios

1. **資料預處理**: 在處理 API 回傳資料前去除重複項目
2. **表單驗證**: 檢查使用者輸入的重複值
3. **資料分析**: 計算唯一值數量
4. **陣列合併**: 合併多個陣列並去除重複

## 比較 / Comparison

| 方法 / Method | 效能 / Performance | 適用場景 / Use Case |
|-------------|-------------------|-------------------|
| array_unique_indexOf | O(n²) | 簡單類型、需保留第一個位置 |
| array_unique_by_set | O(n) | 大多數場景、高效能需求 |

## API 參考 / API Reference

[查看完整 API](index.d.ts)
