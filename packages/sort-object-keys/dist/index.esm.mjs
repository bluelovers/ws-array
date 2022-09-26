import { array_unique_indexOf as e } from "@lazy-array/util-unique";

function sortObjectKeys(t, r) {
  let s = {};
  "function" == typeof r ? s.sort = r : Array.isArray(r) ? s.keys = r : s = Object.assign(s, r);
  let {keys: o = [], useSource: c} = s;
  if (s.onlyKeys) {
    if (c = !1, "number" != typeof o.length || 0 === o.length) throw new ReferenceError("options.key is empty or not exists.");
  } else o = o.concat().concat(Object.keys(t).sort(s.sort));
  o = e(o), s.desc && (o = o.reverse());
  let y = o.reduce((function(e, r) {
    return (s.allowNotExists || r in t) && (e[r] = t[r]), e;
  }), {});
  return c ? (Object.keys(y).forEach((function(e) {
    delete t[e], t[e] = y[e];
  })), t) : y;
}

Object.defineProperty(sortObjectKeys, "sortObjectKeys", {
  value: sortObjectKeys
}), Object.defineProperty(sortObjectKeys, "sortObject", {
  value: sortObjectKeys
}), Object.defineProperty(sortObjectKeys, "default", {
  value: sortObjectKeys
}), Object.defineProperty(sortObjectKeys, "__esModule", {
  value: !0
});

export { sortObjectKeys as default, sortObjectKeys as sortObject, sortObjectKeys };
//# sourceMappingURL=index.esm.mjs.map
