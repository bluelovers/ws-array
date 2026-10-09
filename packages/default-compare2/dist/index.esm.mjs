function _typeOf(e) {
  return null === e ? "null" : typeof e;
}

let e = /*#__PURE__*/ function(e) {
  return e[e.KEEP = 0] = "KEEP", e[e.RIGHT = 1] = "RIGHT", e[e.LEFT = -1] = "LEFT", 
  e;
}({});

function numberCompare(r, n) {
  return r < n ? e.LEFT : r > n ? e.RIGHT : e.KEEP;
}

function nullCompare(r, n) {
  const o = _typeOf(r), t = _typeOf(n);
  return "null" === o ? "null" === t ? e.KEEP : "undefined" === t ? e.LEFT : e.RIGHT : "undefined" === o ? "null" === t ? e.RIGHT : "undefined" === t ? e.KEEP : e.RIGHT : "null" === t || "undefined" === t ? e.LEFT : void 0;
}

function symbolCompare(r, n) {
  const o = _typeOf(r), t = _typeOf(n);
  return "symbol" === o ? "symbol" === t ? numberCompare(String(r), String(n)) : e.LEFT : "symbol" === t ? e.RIGHT : numberCompare(r, n);
}

function dateCompare(e, r) {
  return e.getTime() - r.getTime();
}

function stringCompareLocale(e, r) {
  return e.localeCompare(r);
}

function defaultCompareBasic(e, r) {
  const n = nullCompare(e, r);
  return "number" == typeof n ? n : numberCompare(e, r);
}

function defaultCompareWithSymbol(e, r) {
  const n = nullCompare(e, r);
  return "number" == typeof n ? n : symbolCompare(e, r);
}

function arraySortWithSymbol(e) {
  return e.sort(defaultCompareWithSymbol);
}

export { e as EnumSortCompareResult, _typeOf, arraySortWithSymbol, dateCompare, defaultCompareWithSymbol as default, defaultCompareWithSymbol as defaultCompare, defaultCompareBasic, defaultCompareWithSymbol, nullCompare, numberCompare, stringCompareLocale, symbolCompare };
//# sourceMappingURL=index.esm.mjs.map
