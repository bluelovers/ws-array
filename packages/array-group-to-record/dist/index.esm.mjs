import r from "hash-sum";

function handleOptions(o) {
  var n;
  const e = null !== (n = null == o ? void 0 : o.getKey) && void 0 !== n ? n : o => r(o);
  return {
    ...o,
    getKey: e
  };
}

function arrayGroupToRecord(r, o) {
  var n;
  const {getKey: e, init: u} = handleOptions(o);
  return r.reduce(((r, o, n, u) => {
    var t;
    const a = e(o, n, u);
    return null !== (t = r[a]) && void 0 !== t || (r[a] = []), r[a].push(o), r;
  }), null !== (n = null == u ? void 0 : u()) && void 0 !== n ? n : {});
}

function arrayGroupToMap(r, o) {
  var n;
  const {getKey: e, init: u} = handleOptions(o);
  return r.reduce(((r, o, n, u) => {
    var t;
    const a = e(o, n, u), l = null !== (t = r.get(a)) && void 0 !== t ? t : [];
    return l.push(o), r.set(a, l), r;
  }), null !== (n = null == u ? void 0 : u()) && void 0 !== n ? n : new Map);
}

function sumGroup(r) {
  let o = 0;
  return void 0 === r.forEach && (r = Object.values(r)), r.forEach((r => o += r.length)), 
  o;
}

export { arrayGroupToMap, arrayGroupToRecord, arrayGroupToRecord as default, handleOptions, sumGroup };
//# sourceMappingURL=index.esm.mjs.map
