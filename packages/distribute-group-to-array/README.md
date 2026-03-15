# distribute-group-to-array

將分組資料均匀分發到多個陣列中，適用於負載均衡和任務分配場景。

Distribute grouped data evenly into multiple arrays, suitable for load balancing and task distribution scenarios.

## 功能說明 / Features

- **distributeGroupToArrayCore**: 將群組分發到多個二維陣列
- **distributeGroupToArray**: 將群組分發並扁平化為單一陣列
- **mapToRecord**: 將 Map 轉換為 Record

## 安裝 / Install

```bash
yarn add distribute-group-to-array
yarn-tool add distribute-group-to-array
yt add distribute-group-to-array
```

## 使用範例 / Usage Examples

### 基本使用 / Basic Usage

```typescript
import distributeGroupToArray from 'distribute-group-to-array';

// 將兩個群組的資料交替分發
const result = distributeGroupToArray({
  groupA: ['a1', 'a2', 'a3'],
  groupB: ['b1', 'b2']
});

console.log(result); // => ['a1', 'b1', 'a2', 'b2', 'a3']
```

### 分發到多個陣列 / Distribute to Multiple Arrays

```typescript
import { distributeGroupToArrayCore } from 'distribute-group-to-array';

// 分發到 3 個陣列
const result = distributeGroupToArrayCore({
  groupA: ['a1', 'a2', 'a3', 'a4'],
  groupB: ['b1', 'b2'],
  groupC: ['c1']
}, { groupArraySize: 3 });

console.log(result);
// => [['a1', 'b1', 'c1'], ['a2', 'b2'], ['a3', 'a4']]
```

### 自訂初始化 / Custom Initialization

```typescript
import { distributeGroupToArrayCore } from 'distribute-group-to-array';

// 自訂初始化的陣列數量
const result = distributeGroupToArrayCore({
  users: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6']
}, {
  init: () => [[], [], []],
});

console.log(result);
// => [['u1', 'u4'], ['u2', 'u5'], ['u3', 'u6']]
```

### 使用 Map 輸入 / Using Map Input

```typescript
import distributeGroupToArray from 'distribute-group-to-array';

const map = new Map([
  ['groupA', ['a1', 'a2']],
  ['groupB', ['b1', 'b2']]
]);

const result = distributeGroupToArray(map);
console.log(result); // => ['a1', 'b1', 'a2', 'b2']
```

## 應用情境 / Application Scenarios

1. **負載均衡**: 將任務均匀分配到多個 worker 處理
2. **資料分頁**: 將大型資料集分發到多個頁面顯示
3. **輪詢分發**: 實現簡單的輪詢調度和请求分发
4. **批次處理**: 將資料均匀分成多個批次處理

## API 參考 / API Reference

```typescript
function distributeGroupToArray<T>(
  group: Record<string, T[]> | Map<any, T[]>,
  options?: IOptionsDistributeGroupToArray<T>
): T[]

function distributeGroupToArrayCore<T>(
  group: Record<string, T[]> | Map<any, T[]>,
  options?: IOptionsDistributeGroupToArray<T>
): T[][]
```

[查看完整 API](index.d.ts)
