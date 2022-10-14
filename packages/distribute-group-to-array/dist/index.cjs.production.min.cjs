"use strict";

function _createGroupArray(r) {
  const e = [];
  for (let o = 0; o < r; o++) e.push([]);
  return e;
}

function distributeGroupToArrayCore(r, e) {
  var o, t, u;
  void 0 !== r.entries && (r = mapToRecord(r));
  const i = null !== (o = null == e || null === (t = e.init) || void 0 === t ? void 0 : t.call(e)) && void 0 !== o ? o : _createGroupArray(null !== (u = null == e ? void 0 : e.groupArraySize) && void 0 !== u ? u : 4), n = i.length, {names: s, record: a} = Object.entries(r).reduce(((r, [e, o]) => (r.names.push(e), 
  r.record[e] = o.slice(), r)), {
    names: [],
    record: {}
  });
  let d = n - 1;
  do {
    let r;
    for (let e of s) {
      var p;
      r = null === (p = a[e]) || void 0 === p ? void 0 : p.pop(), r ? i[d % n].push(r) : delete a[e];
    }
    r && d++;
  } while (Object.keys(a).length);
  return i;
}

function mapToRecord(r) {
  const e = {};
  for (let [o, t] of r.entries()) e[o] = t;
  return e;
}

function distributeGroupToArray(r, e) {
  return distributeGroupToArrayCore(r, e).flat();
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports._createGroupArray = _createGroupArray, exports.default = distributeGroupToArray, 
exports.distributeGroupToArray = distributeGroupToArray, exports.distributeGroupToArrayCore = distributeGroupToArrayCore, 
exports.mapToRecord = mapToRecord;
//# sourceMappingURL=index.cjs.production.min.cjs.map
