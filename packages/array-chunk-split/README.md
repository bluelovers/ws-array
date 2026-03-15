# array-chunk-split

將陣列分割成多個區塊，支援固定數量或固定大小的分塊方式。

Split an array into multiple chunks, supporting fixed quantity or fixed size chunking.

## 功能說明 / Features

- **arrayChunkSplit**: 根據區塊數量分割陣列
- **arrayChunkBySize**: 根據區塊大小分割陣列
- **arrayChunkMap**: 分塊後進行映射轉換

## 安裝 / Install

```bash
yarn add array-chunk-split
yarn-tool add array-chunk-split
yt add array-chunk-split
```

## 使用範例 / Usage Examples

### arrayChunkSplit - 固定數量分塊

將陣列均勻分割成指定數量的區塊。

```typescript
import { arrayChunkSplit } from 'array-chunk-split';

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// 分成 4 個區塊
console.log(arrayChunkSplit(arr, 4));
// => [[1, 2], [3, 4], [5, 6], [7, 8]]

// 分成 3 個區塊（最後一個區塊會較短）
console.log(arrayChunkSplit([1, 2, 3, 4, 5], 3));
// => [[1, 2], [3, 4], [5]]
```

### arrayChunkBySize - 固定大小分塊

將陣列按固定大小分割。

```typescript
import { arrayChunkBySize } from 'array-chunk-split';

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// 每個區塊 5 個元素
console.log(arrayChunkBySize(arr, 5));
// => [[1, 2, 3, 4, 5], [6, 7, 8]]

// 每個區塊 3 個元素
console.log(arrayChunkBySize(arr, 3));
// => [[1, 2, 3], [4, 5, 6], [7, 8]]
```

### 多重區塊大小

支援指定多個區塊大小。

```typescript
import { arrayChunkBySize } from 'array-chunk-split';

console.log(arrayChunkBySize([1, 2, 3, 4, 5], [2, 3]));
// => [[1, 2], [3, 4, 5]]

console.log(arrayChunkBySize([1, 2, 3, 4, 5, 6, 7], [2, 2, 2]));
// => [[1, 2], [3, 4], [5, 6], [7]]
```

### arrayChunkMap - 分塊映射

分塊後對每個區塊進行轉換。

```typescript
import { arrayChunkMap } from 'array-chunk-split';

// 預設：返回每個區塊的第一個元素
console.log(arrayChunkMap({
  inputArray: [1, 2, 3, 4, 5, 6, 7, 8],
  maxChunkLength: 4
}));
// => [1, 3, 5, 7]

// 返回每個區塊的最後一個元素
console.log(arrayChunkMap({
  inputArray: [1, 2, 3, 4, 5, 6, 7, 8],
  maxChunkLength: 4,
  mapMethod: true
}));
// => [2, 4, 6, 8]

// 自訂映射函式：計算每個區塊的總和
console.log(arrayChunkMap({
  inputArray: [1, 2, 3, 4, 5, 6],
  maxChunkSize: 2,
  mapMethod: (chunk) => chunk.reduce((a, b) => a + b, 0)
}));
// => [3, 7, 11]
```

## 應用情境 / Application Scenarios

1. **批次處理**: 將大型資料集分塊處理
2. **API 請求**: 將 ID 列表分批發送請求
3. **負載均衡**: 將任務均匀分配到多個 worker
4. **分頁顯示**: 將資料分塊用於分頁顯示
5. **平行處理**: 將資料分塊進行平行運算

## 比較 / Comparison

| 函式 / Function | 參數 / Parameter | 說明 / Description |
|---------------|----------------|-------------------|
| arrayChunkSplit | maxChunkLength | 分成 N 個區塊 / Split into N chunks |
| arrayChunkBySize | maxChunkSize | 每個區塊 M 個元素 / Each chunk has M elements |

## API 參考 / API Reference

```typescript
// 根據區塊數量分割
function arrayChunkSplit<T>(arr: T[], maxChunkLength: number): IChunkArray<T>

// 根據區塊大小分割
function arrayChunkBySize<T>(
  arr: T[],
  maxChunkSize: number | number[]
): IChunkArray<T>

// 分塊後映射
function arrayChunkMap<T, R>(
  options: IOptions<T> & { mapMethod?: boolean | IMapCallback<T, R> }
): R[]
```

[查看完整 API](index.d.ts)
