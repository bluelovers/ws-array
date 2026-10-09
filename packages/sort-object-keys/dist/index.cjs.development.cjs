'use strict';

var utilUnique = require('@lazy-array/util-unique');

/**
 * 對物件的鍵進行排序並返回新物件
 * Sort object keys and return a new object
 *
 * 應用情境：
 * - 確保物件鍵順序一致，便於測試和比對
 * - 自訂鍵的排列順序
 * - 產生穩定的物件結構用於序列化
 * - Ensure consistent object key order for testing and comparison
 * - Custom key ordering
 * - Generate stable object structure for serialization
 *
 * @param object - 要排序的物件 / Object to sort
 * @param sortWith - 排序方式：自訂函式、鍵陣列或選項物件 / Sort method: custom function, key array, or options object
 * @returns 排序後的新物件 / Sorted new object
 *
 * @example
 * // 基本排序
 * sortObjectKeys({ c: 1, b: 2, a: 3 }); // => { a: 3, b: 2, c: 1 }
 *
 * // 自訂鍵順序
 * sortObjectKeys({ c: 1, b: 2, a: 3 }, ['b', 'a', 'c']); // => { b: 2, a: 3, c: 1 }
 *
 * // 自訂排序函式
 * sortObjectKeys({ key2: 1, key10: 1, key1: 1 }, (a, b) => {
 *   return a.localeCompare(b, undefined, { numeric: true });
 * }); // => { key1: 1, key2: 1, key10: 1 }
 */

function sortObjectKeys(object, sortWith) {
  let options = {};
  if (typeof sortWith === 'function') {
    options.sort = sortWith;
  } else if (Array.isArray(sortWith)) {
    options.keys = sortWith;
  } else {
    options = Object.assign(options, sortWith);
  }
  let {
    keys = [],
    useSource
  } = options;
  if (Array.isArray(keys)) {
    keys = keys.slice();
  }
  if (options.onlyKeys) {
    useSource = false;
    if (typeof keys.length !== 'number' || keys.length === 0) {
      throw new ReferenceError(`options.key is empty or not exists.`);
    }
  } else {
    keys = keys.concat(Object.keys(object).sort(options.sort));
  }
  keys = utilUnique.array_unique_indexOf(keys);
  if (options.desc) {
    keys = keys.reverse();
  }
  let ret = keys.reduce(function (total, key) {
    if (options.allowNotExists || key in object) {
      total[key] = object[key];
    }
    return total;
  }, {});
  if (useSource) {
    Object.keys(ret).forEach(function (key) {
      delete object[key];
      object[key] = ret[key];
    });
    return object;
  }
  return ret;
}
{
  Object.defineProperty(sortObjectKeys, 'sortObjectKeys', {
    value: sortObjectKeys
  });
  Object.defineProperty(sortObjectKeys, 'sortObject', {
    value: sortObjectKeys
  });
  Object.defineProperty(sortObjectKeys, 'default', {
    value: sortObjectKeys
  });
  Object.defineProperty(sortObjectKeys, "__esModule", {
    value: true
  });
}

// @ts-ignore
module.exports = sortObjectKeys;
//# sourceMappingURL=index.cjs.development.cjs.map
