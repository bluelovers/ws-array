'use strict';

var stringNaturalCompare2 = require('string-natural-compare2');

/**
 * 以人類直覺的方式比較字母數字字串
 * Compare alphanumeric strings the same way a human would
 *
 * 使用自然排序演算法（又稱 alphanum 演算法），
 * 數字字元根據其數值而非 ASCII 值進行排序。
 * Uses natural order algorithm (also known as alphanum algorithm)
 * where numeric characters are sorted based on their numeric values rather than ASCII values.
 *
 * 應用情境：
 * - 檔案名稱排序（如 img1, img2, img10）
 * - 版本號排序（如 v1.0, v1.1, v2.0）
 * - 列表編號排序
 * - File name sorting (e.g., img1, img2, img10)
 * - Version number sorting (e.g., v1.0, v1.1, v2.0)
 * - List item numbering
 *
 * @param a - 要比較的第一個值 / First value to compare
 * @param b - 要比較的第二個值 / Second value to compare
 * @param opts - 比較選項 / Compare options
 * @returns 比較結果 / Compare result: < 0 (a < b), 0 (a == b), > 0 (a > b)
 *
 * @example
 * // 標準排序 vs 自然排序
 * // Standard sort vs natural sort
 * ['img10', 'img2', 'img1'].sort(naturalCompare); // => ['img1', 'img2', 'img10']
 * ['img10', 'img2', 'img1'].sort(); // => ['img1', 'img10', 'img2']
 */
function naturalCompare(a, b, opts) {
  let i;
  const typeA = typeof a === 'number';
  const typeB = typeof b === 'number';
  if (typeA && typeB) {
    // @ts-ignore
    i = a - b;
  } else {
    if (typeA) {
      a = String(a);
    }
    if (typeB) {
      b = String(b);
    }
    if (a === b) {
      return 0;
    }
    i = stringNaturalCompare2.naturalCompare(a, b, opts);
  }
  if (i !== 0 && opts !== null && opts !== void 0 && opts.desc) {
    i = 0 - i;
  }
  return i;
}
/**
 * 建立具有預設選項的比較函式
 * Create a compare function with preset options
 *
 * 應用情境：
 * - 建立可重用的比較函式
 * - 避免每次呼叫時重複傳遞選項
 * - Create reusable compare functions
 * - Avoid passing options on every call
 *
 * @param opts - 預設選項 / Default options
 * @returns 預設選項的比較函式 / Compare function with preset options
 *
 * @example
 * const compareAsc = createNew();
 * const compareDesc = createNew({ desc: true });
 * const compareCaseInsensitive = createNew({ caseInsensitive: true });
 */
function createNew(opts) {
  return (a, b) => naturalCompare(a, b, opts);
}
/**
 * 不區分大小寫的比較函式
 * Case-insensitive compare function
 *
 * 應用情境：
 * - 排序時忽略大小寫差異
 * - 檔案名稱或標題排序
 * - Sort ignoring case differences
 * - File name or title sorting
 *
 * @example
 * naturalCompare('Apple', 'apple'); // => -1 (有大小寫區分)
 * compareCaseInsensitive('Apple', 'apple'); // => 0 (忽略大小寫)
 */
const compareCaseInsensitive = /*#__PURE__*/createNew({
  caseInsensitive: true
});
// @ts-ignore
{
  Object.defineProperty(naturalCompare, "__esModule", {
    value: true
  });
  Object.defineProperty(naturalCompare, "default", {
    value: naturalCompare
  });
  Object.defineProperty(naturalCompare, "naturalCompare", {
    value: naturalCompare
  });
  Object.defineProperty(naturalCompare, "createNew", {
    value: createNew
  });
  Object.defineProperty(naturalCompare, "compareCaseInsensitive", {
    value: compareCaseInsensitive
  });
  Object.defineProperty(naturalCompare, "caseInsensitive", {
    value: compareCaseInsensitive
  });
}

// @ts-ignore
module.exports = naturalCompare;
//# sourceMappingURL=index.cjs.development.cjs.map
