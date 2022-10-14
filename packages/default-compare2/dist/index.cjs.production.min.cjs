"use strict";

function _typeOf(e) {
  return null === e ? "null" : typeof e;
}

var e;

function numberCompare(e, o) {
  return e < o ? -1 : e > o ? 1 : 0;
}

function nullCompare(e, o) {
  const r = _typeOf(e), t = _typeOf(o);
  return "null" === r ? "null" === t ? 0 : "undefined" === t ? -1 : 1 : "undefined" === r ? "null" === t ? 1 : "undefined" === t ? 0 : 1 : "null" === t || "undefined" === t ? -1 : void 0;
}

function symbolCompare(e, o) {
  const r = _typeOf(e), t = _typeOf(o);
  return "symbol" === r ? "symbol" === t ? numberCompare(String(e), String(o)) : -1 : "symbol" === t ? 1 : numberCompare(e, o);
}

function defaultCompareWithSymbol(e, o) {
  const r = nullCompare(e, o);
  return "number" == typeof r ? r : symbolCompare(e, o);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EnumSortCompareResult = void 0, (e = exports.EnumSortCompareResult || (exports.EnumSortCompareResult = {}))[e.KEEP = 0] = "KEEP", 
e[e.RIGHT = 1] = "RIGHT", e[e.LEFT = -1] = "LEFT", exports._typeOf = _typeOf, exports.arraySortWithSymbol = function arraySortWithSymbol(e) {
  return e.sort(defaultCompareWithSymbol);
}, exports.dateCompare = function dateCompare(e, o) {
  return e.getTime() - o.getTime();
}, exports.default = defaultCompareWithSymbol, exports.defaultCompare = defaultCompareWithSymbol, 
exports.defaultCompareBasic = function defaultCompareBasic(e, o) {
  const r = nullCompare(e, o);
  return "number" == typeof r ? r : numberCompare(e, o);
}, exports.defaultCompareWithSymbol = defaultCompareWithSymbol, exports.nullCompare = nullCompare, 
exports.numberCompare = numberCompare, exports.stringCompareLocale = function stringCompareLocale(e, o) {
  return e.localeCompare(o);
}, exports.symbolCompare = symbolCompare;
//# sourceMappingURL=index.cjs.production.min.cjs.map
