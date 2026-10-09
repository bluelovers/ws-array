!function(e, o) {
  "object" == typeof exports && "undefined" != typeof module ? o(exports) : "function" == typeof define && define.amd ? define([ "exports" ], o) : o((e = "undefined" != typeof globalThis ? globalThis : e || self).DefaultCompareWithSymbol = {});
}(this, function(e) {
  "use strict";
  function _typeOf(e) {
    return null === e ? "null" : typeof e;
  }
  let o = /*#__PURE__*/ function(e) {
    return e[e.KEEP = 0] = "KEEP", e[e.RIGHT = 1] = "RIGHT", e[e.LEFT = -1] = "LEFT", 
    e;
  }({});
  function numberCompare(e, t) {
    return e < t ? o.LEFT : e > t ? o.RIGHT : o.KEEP;
  }
  function nullCompare(e, t) {
    const n = _typeOf(e), r = _typeOf(t);
    return "null" === n ? "null" === r ? o.KEEP : "undefined" === r ? o.LEFT : o.RIGHT : "undefined" === n ? "null" === r ? o.RIGHT : "undefined" === r ? o.KEEP : o.RIGHT : "null" === r || "undefined" === r ? o.LEFT : void 0;
  }
  function symbolCompare(e, t) {
    const n = _typeOf(e), r = _typeOf(t);
    return "symbol" === n ? "symbol" === r ? numberCompare(String(e), String(t)) : o.LEFT : "symbol" === r ? o.RIGHT : numberCompare(e, t);
  }
  function defaultCompareWithSymbol(e, o) {
    const t = nullCompare(e, o);
    return "number" == typeof t ? t : symbolCompare(e, o);
  }
  e.EnumSortCompareResult = o, e._typeOf = _typeOf, e.arraySortWithSymbol = function arraySortWithSymbol(e) {
    return e.sort(defaultCompareWithSymbol);
  }, e.dateCompare = function dateCompare(e, o) {
    return e.getTime() - o.getTime();
  }, e.default = defaultCompareWithSymbol, e.defaultCompare = defaultCompareWithSymbol, 
  e.defaultCompareBasic = function defaultCompareBasic(e, o) {
    const t = nullCompare(e, o);
    return "number" == typeof t ? t : numberCompare(e, o);
  }, e.defaultCompareWithSymbol = defaultCompareWithSymbol, e.nullCompare = nullCompare, 
  e.numberCompare = numberCompare, e.stringCompareLocale = function stringCompareLocale(e, o) {
    return e.localeCompare(o);
  }, e.symbolCompare = symbolCompare, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});
//# sourceMappingURL=index.umd.production.min.cjs.map
