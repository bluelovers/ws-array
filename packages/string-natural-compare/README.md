# @bluelovers/string-natural-compare

自然排序比較函式，以人類直覺方式比較字母數字字串。

Natural sort compare function that compares alphanumeric strings the way humans would.

## 功能說明 / Features

- **naturalCompare**: 自然排序比較函式 / Natural sort compare function
- **createNew**: 建立預設選項的比較函式 / Create compare function with preset options
- **compareCaseInsensitive**: 不區分大小寫的比較函式 / Case-insensitive compare function

## 安裝 / Install

```bash
yarn add @bluelovers/string-natural-compare
yarn-tool add @bluelovers/string-natural-compare
yt add @bluelovers/string-natural-compare
```

## 使用範例 / Usage Examples

### 基本使用 / Basic Usage

```typescript
import naturalCompare from '@bluelovers/string-natural-compare';

// 數字在字串中的排序
const files = ['img10', 'img2', 'img1', 'img20'];
const sorted = files.sort(naturalCompare);

console.log(sorted); // => ['img1', 'img2', 'img10', 'img20']

// 標準排序結果
console.log(files.sort()); // => ['img1', 'img10', 'img2', 'img20']
```

### 版本號排序 / Version Number Sorting

```typescript
import naturalCompare from '@bluelovers/string-natural-compare';

const versions = ['v1.0', 'v2.0', 'v1.1', 'v10.0', 'v1.10'];
const sorted = versions.sort(naturalCompare);

console.log(sorted); // => ['v1.0', 'v1.1', 'v1.10', 'v2.0', 'v10.0']
```

### 建立自訂比較函式 / Create Custom Compare Function

```typescript
import { createNew } from '@bluelovers/string-natural-compare';

// 降冪排列
const compareDesc = createNew({ desc: true });
console.log(['img1', 'img10', 'img2'].sort(compareDesc)); // => ['img2', 'img10', 'img1']

// 不區分大小寫
const compareCI = createNew({ caseInsensitive: true });
console.log(['Apple', 'banana', 'Cherry'].sort(compareCI)); // => ['Apple', 'banana', 'Cherry']
```

### 數字比較 / Number Comparison

```typescript
import naturalCompare from '@bluelovers/string-natural-compare';

console.log(naturalCompare(1, 2));   // => -1
console.log(naturalCompare(10, 2));  // => 1
console.log(naturalCompare(2, 2));   // => 0

// 混合比較
console.log(naturalCompare('a1', 'a2')); // => -1
console.log(naturalCompare('a10', 'a2')); // => 1
```

## 應用情境 / Application Scenarios

1. **檔案名稱排序**: 正確排序 img1, img2, img10 等檔案
2. **版本號排序**: 處理 v1.0, v1.1, v2.0 等版本號
3. **列表編號排序**: 處理任務編號、章節編號
4. **搜尋結果排序**: 提供更直觀的排序體驗

## 與 string-natural-compare2 的關係

此套件基於 [string-natural-compare2](https://www.npmjs.com/package/string-natural-compare2) 封裝，提供：
- TypeScript 類型支援
- 額外的選項支援（如 `desc` 降冪排列）
- 更方便的工具函式

## API 參考 / API Reference

[查看完整 API](index.d.ts)
