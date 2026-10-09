"use strict";

function _typeOf(e) {
  return null === e ? "null" : typeof e;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

let e = /*#__PURE__*/ function(e) {
  return e[e.KEEP = 0] = "KEEP", e[e.RIGHT = 1] = "RIGHT", e[e.LEFT = -1] = "LEFT", 
  e;
}({});

function numberCompare(r, o) {
  return r < o ? e.LEFT : r > o ? e.RIGHT : e.KEEP;
}

function nullCompare(r, o) {
  const t = _typeOf(r), n = _typeOf(o);
  return "null" === t ? "null" === n ? e.KEEP : "undefined" === n ? e.LEFT : e.RIGHT : "undefined" === t ? "null" === n ? e.RIGHT : "undefined" === n ? e.KEEP : e.RIGHT : "null" === n || "undefined" === n ? e.LEFT : void 0;
}

function symbolCompare(r, o) {
  const t = _typeOf(r), n = _typeOf(o);
  return "symbol" === t ? "symbol" === n ? numberCompare(String(r), String(o)) : e.LEFT : "symbol" === n ? e.RIGHT : numberCompare(r, o);
}

function defaultCompareWithSymbol(e, r) {
  const o = nullCompare(e, r);
  return "number" == typeof o ? o : symbolCompare(e, r);
}

exports.EnumSortCompareResult = e, exports._typeOf = _typeOf, exports.arraySortWithSymbol = function arraySortWithSymbol(e) {
  return e.sort(defaultCompareWithSymbol);
}, exports.dateCompare = function dateCompare(e, r) {
  return e.getTime() - r.getTime();
}, exports.default = defaultCompareWithSymbol, exports.defaultCompare = defaultCompareWithSymbol, 
exports.defaultCompareBasic = function defaultCompareBasic(e, r) {
  const o = nullCompare(e, r);
  return "number" == typeof o ? o : numberCompare(e, r);
}, exports.defaultCompareWithSymbol = defaultCompareWithSymbol, exports.nullCompare = nullCompare, 
exports.numberCompare = numberCompare, exports.stringCompareLocale = function stringCompareLocale(e, r) {
  return e.localeCompare(r);
}, exports.symbolCompare = symbolCompare;
//# sourceMappingURL=index.cjs.production.min.cjs.map
