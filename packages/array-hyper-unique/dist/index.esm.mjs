import e from "deep-eql";

import { findLastIndex as u, findIndex as r } from "lodash-es";

function equals(u, r) {
  return e(u, r);
}

function defaultFilter(e = {}) {
  const a = e.checker || defaultChecker, i = e.filter || null, t = e.removeFromFirst ? u : r;
  return (e, u, r) => t(r, (u => a(u, e, r, r))) == u && (!i || i(e));
}

function defaultChecker(u, r, a, i) {
  return e(u, r);
}

function array_unique(e, u = {}) {
  if (!Array.isArray(e)) throw new TypeError(`Expected an Array but got ${typeof e}.`);
  const r = defaultFilter(u);
  if (u.overwrite) {
    let u = e.length;
    for (;u--; ) r(e[u], u, e) || e.splice(u, 1);
    return e;
  }
  return e.filter(r);
}

function array_unique_overwrite(e, u = {}) {
  return array_unique(e, {
    ...u,
    overwrite: !0
  });
}

function lazy_unique(...e) {
  return array_unique(e.length > 1 ? e : e[0]);
}

function lazy_unique_overwrite(...e) {
  return array_unique_overwrite(e.length > 1 ? e : e[0]);
}

lazy_unique.array_unique = array_unique, lazy_unique.array_unique_overwrite = array_unique_overwrite, 
lazy_unique.lazy_unique_overwrite = lazy_unique_overwrite, lazy_unique.equals = equals, 
lazy_unique.defaultFilter = defaultFilter, lazy_unique.defaultChecker = defaultChecker, 
lazy_unique.lazy_unique = lazy_unique, lazy_unique.default = lazy_unique, Object.defineProperty(lazy_unique, "__esModule", {
  value: !0
});

export { array_unique, array_unique_overwrite, lazy_unique as default, defaultChecker, defaultFilter, equals, lazy_unique, lazy_unique_overwrite };
//# sourceMappingURL=index.esm.mjs.map
