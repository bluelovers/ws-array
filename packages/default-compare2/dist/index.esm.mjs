function _typeOf(e) {
  return null === e ? "null" : typeof e;
}

var e;

function numberCompare(e, o) {
  return e < o ? -1 : e > o ? 1 : 0;
}

function nullCompare(e, o) {
  const r = _typeOf(e), n = _typeOf(o);
  return "null" === r ? "null" === n ? 0 : "undefined" === n ? -1 : 1 : "undefined" === r ? "null" === n ? 1 : "undefined" === n ? 0 : 1 : "null" === n || "undefined" === n ? -1 : void 0;
}

function symbolCompare(e, o) {
  const r = _typeOf(e), n = _typeOf(o);
  return "symbol" === r ? "symbol" === n ? numberCompare(String(e), String(o)) : -1 : "symbol" === n ? 1 : numberCompare(e, o);
}

function dateCompare(e, o) {
  return e.getTime() - o.getTime();
}

function stringCompareLocale(e, o) {
  return e.localeCompare(o);
}

function defaultCompareBasic(e, o) {
  const r = nullCompare(e, o);
  return "number" == typeof r ? r : numberCompare(e, o);
}

function defaultCompareWithSymbol(e, o) {
  const r = nullCompare(e, o);
  return "number" == typeof r ? r : symbolCompare(e, o);
}

function arraySortWithSymbol(e) {
  return e.sort(defaultCompareWithSymbol);
}

!function(e) {
  e[e.KEEP = 0] = "KEEP", e[e.RIGHT = 1] = "RIGHT", e[e.LEFT = -1] = "LEFT";
}(e || (e = {}));

export { e as EnumSortCompareResult, _typeOf, arraySortWithSymbol, dateCompare, defaultCompareWithSymbol as default, defaultCompareWithSymbol as defaultCompare, defaultCompareBasic, defaultCompareWithSymbol, nullCompare, numberCompare, stringCompareLocale, symbolCompare };
//# sourceMappingURL=index.esm.mjs.map
