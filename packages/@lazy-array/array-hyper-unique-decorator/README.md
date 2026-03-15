# @lazy-array/array-hyper-unique-decorator

為方法提供陣列深度去重裝飾器，支援同步和異步模式。

Provides array deep deduplication decorators for methods, supporting synchronous and asynchronous modes.

## 功能說明 / Features

- **ArrayUniqueDecorator**: 同步陣列去重裝飾器
- **ArrayUniqueOverwriteDecorator**: 同步覆寫模式去重裝飾器
- **ArrayUniqueAsyncDecorator**: 異步陣列去重裝飾器
- **ArrayUniqueOverwriteAsyncDecorator**: 異步覆寫模式去重裝飾器

## 安裝 / Install

```bash
yarn add @lazy-array/array-hyper-unique-decorator
yarn-tool add @lazy-array/array-hyper-unique-decorator
yt add @lazy-array/array-hyper-unique-decorator
```

## 使用範例 / Usage Examples

### 同步裝飾器 / Synchronous Decorator

```typescript
import { ArrayUniqueDecorator } from '@lazy-array/array-hyper-unique-decorator';

class DataService {
  @ArrayUniqueDecorator()
  getItems() {
    return [
      { id: 1, name: 'Alice' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];
  }
}

const service = new DataService();
console.log(service.getItems());
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### 異步裝飾器 / Async Decorator

```typescript
import { ArrayUniqueAsyncDecorator } from '@lazy-array/array-hyper-unique-decorator';

class ApiService {
  @ArrayUniqueAsyncDecorator()
  async fetchUsers() {
    // 模擬 API 請求
    return Promise.resolve([
      { id: 1, name: 'Alice' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]);
  }
}

const api = new ApiService();
api.fetchUsers().then(users => {
  console.log(users);
  // => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
});
```

## 應用情境 / Application Scenarios

1. **API 資料處理**: 自動去除 API 回傳的重複資料
2. **快取管理**: 確保快取資料的唯一性
3. **表單驗證**: 處理使用者提交的重複選項
4. **資料聚合**: 合併多個資料源後進行去重

## 與 array-hyper-unique 的關係 / Relationship with array-hyper-unique

此套件基於 [array-hyper-unique](../array-hyper-unique) 實現，提供裝飾器形式的使用方式。

This package is built on top of [array-hyper-unique](../array-hyper-unique), providing decorator-based usage.

## API 參考 / API Reference

[查看完整 API](index.d.ts)
