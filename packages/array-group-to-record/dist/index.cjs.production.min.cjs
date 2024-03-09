"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var r = require("hash-sum");

function handleOptions(e) {
  var o;
  const n = null !== (o = null == e ? void 0 : e.getKey) && void 0 !== o ? o : e => r(e);
  return {
    ...e,
    getKey: n
  };
}

function arrayGroupToRecord(r, e) {
  var o;
  const {getKey: n, init: t} = handleOptions(e);
  return r.reduce(((r, e, o, t) => {
    var u;
    const a = n(e, o, t);
    return null !== (u = r[a]) && void 0 !== u || (r[a] = []), r[a].push(e), r;
  }), null !== (o = null == t ? void 0 : t()) && void 0 !== o ? o : {});
}

exports.arrayGroupToMap = function arrayGroupToMap(r, e) {
  var o;
  const {getKey: n, init: t} = handleOptions(e);
  return r.reduce(((r, e, o, t) => {
    var u;
    const a = n(e, o, t), l = null !== (u = r.get(a)) && void 0 !== u ? u : [];
    return l.push(e), r.set(a, l), r;
  }), null !== (o = null == t ? void 0 : t()) && void 0 !== o ? o : new Map);
}, exports.arrayGroupToRecord = arrayGroupToRecord, exports.default = arrayGroupToRecord, 
exports.handleOptions = handleOptions, exports.sumGroup = function sumGroup(r) {
  let e = 0;
  return void 0 === r.forEach && (r = Object.values(r)), r.forEach((r => e += r.length)), 
  e;
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
