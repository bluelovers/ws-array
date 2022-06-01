import e from "string-natural-compare";

function naturalCompare(a, r, t) {
  let n;
  if ("number" == typeof a && "number" == typeof r) n = a - r; else {
    if ("number" == typeof a ? a = String(a) : "number" == typeof r && (r = String(r)), 
    a === r) return 0;
    n = e(a, r, t);
  }
  return 0 !== n && null != t && t.desc && (n = 0 - n), n;
}

function createNew(e) {
  return (a, r) => naturalCompare(a, r, e);
}

const a = createNew({
  caseInsensitive: !0
});

naturalCompare.createNew = createNew, naturalCompare.compareCaseInsensitive = a, 
naturalCompare.caseInsensitive = a, naturalCompare.default = naturalCompare, Object.defineProperty(naturalCompare, "__esModule", {
  value: !0
});

export { a as caseInsensitive, a as compareCaseInsensitive, createNew, naturalCompare as default, naturalCompare };
//# sourceMappingURL=index.esm.mjs.map
