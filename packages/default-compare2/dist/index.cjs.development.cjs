'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeOf(target) {
  if (target === null) {
    return 'null';
  }

  return typeof target;
}

exports.EnumSortCompareResult = void 0;

(function (EnumSortCompareResult) {
  EnumSortCompareResult[EnumSortCompareResult["KEEP"] = 0] = "KEEP";
  EnumSortCompareResult[EnumSortCompareResult["RIGHT"] = 1] = "RIGHT";
  EnumSortCompareResult[EnumSortCompareResult["LEFT"] = -1] = "LEFT";
})(exports.EnumSortCompareResult || (exports.EnumSortCompareResult = {}));

function numberCompare(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }

  return 0;
}
function nullCompare(a, b) {
  const typeA = _typeOf(a);

  const typeB = _typeOf(b);

  if (typeA === 'null') {
    return typeB === 'null' ? 0 : typeB === 'undefined' ? -1 : 1;
  } else if (typeA === 'undefined') {
    return typeB === 'null' ? 1 : typeB === 'undefined' ? 0 : 1;
  } else if (typeB === 'null' || typeB === 'undefined') {
    return -1;
  }
}
function symbolCompare(a, b) {
  const typeA = _typeOf(a);

  const typeB = _typeOf(b);

  if (typeA === 'symbol') {
    return typeB === 'symbol' ? numberCompare(String(a), String(b)) : -1;
  } else if (typeB === 'symbol') {
    return 1;
  }

  return numberCompare(a, b);
}
function dateCompare(a, b) {
  return a.getTime() - b.getTime();
}
function stringCompareLocale(a, b) {
  return a.localeCompare(b);
}

function defaultCompareBasic(a, b) {
  const result = nullCompare(a, b);

  if (typeof result === 'number') {
    return result;
  }

  return numberCompare(a, b);
}
function defaultCompareWithSymbol(a, b) {
  const result = nullCompare(a, b);

  if (typeof result === 'number') {
    return result;
  }

  return symbolCompare(a, b);
}
function arraySortWithSymbol(arr) {
  return arr.sort(defaultCompareWithSymbol);
}

exports._typeOf = _typeOf;
exports.arraySortWithSymbol = arraySortWithSymbol;
exports.dateCompare = dateCompare;
exports["default"] = defaultCompareWithSymbol;
exports.defaultCompare = defaultCompareWithSymbol;
exports.defaultCompareBasic = defaultCompareBasic;
exports.defaultCompareWithSymbol = defaultCompareWithSymbol;
exports.nullCompare = nullCompare;
exports.numberCompare = numberCompare;
exports.stringCompareLocale = stringCompareLocale;
exports.symbolCompare = symbolCompare;
//# sourceMappingURL=index.cjs.development.cjs.map
