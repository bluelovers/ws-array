"use strict";

function _interopDefaultLegacy(e) {
  return e && "object" == typeof e && "default" in e ? e : {
    default: e
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = _interopDefaultLegacy(require("hash-sum"));

function handleOptions(r) {
  var o;
  const t = null !== (o = null == r ? void 0 : r.getKey) && void 0 !== o ? o : r => e.default(r);
  return {
    ...r,
    getKey: t
  };
}

function arrayGroupToRecord(e, r) {
  var o;
  const {getKey: t, init: n} = handleOptions(r);
  return e.reduce(((e, r, o, n) => {
    var u;
    const a = t(r, o, n);
    return null !== (u = e[a]) && void 0 !== u || (e[a] = []), e[a].push(r), e;
  }), null !== (o = null == n ? void 0 : n()) && void 0 !== o ? o : {});
}

exports.arrayGroupToMap = function arrayGroupToMap(e, r) {
  var o;
  const {getKey: t, init: n} = handleOptions(r);
  return e.reduce(((e, r, o, n) => {
    var u;
    const a = t(r, o, n), l = null !== (u = e.get(a)) && void 0 !== u ? u : [];
    return l.push(r), e.set(a, l), e;
  }), null !== (o = null == n ? void 0 : n()) && void 0 !== o ? o : new Map);
}, exports.arrayGroupToRecord = arrayGroupToRecord, exports.default = arrayGroupToRecord, 
exports.handleOptions = handleOptions, exports.sumGroup = function sumGroup(e) {
  let r = 0;
  return void 0 === e.forEach && (e = Object.values(e)), e.forEach((e => r += e.length)), 
  r;
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
