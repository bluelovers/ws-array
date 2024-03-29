function arrayChunkMap(e) {
  const {inputArray: r, maxChunkLength: n, maxChunkSize: t} = e;
  let a, {mapMethod: u} = e;
  if (null != n) a = arrayChunkSplit(r, n); else {
    if (null == t) throw new TypeError("maxChunkLength or maxChunkSize is required");
    a = arrayChunkBySize(r, t);
  }
  return "function" != typeof u && (u = u ? e => e[e.length - 1] : e => e[0]), a.map(u);
}

function arrayChunkBySize(e, r) {
  const n = [], {length: t} = e;
  if (Array.isArray(r)) {
    if (!r.filter((e => e && e < t)).length) throw new RangeError(`expected maxChunkSize.length > 0 and each values < ${t} but got ${r}`);
    let a, u = 0;
    for (let h of r) {
      if (a = u + h, n.push(e.slice(u, a)), a >= t) break;
      u = a;
    }
    a < t && n.push(e.slice(u));
  } else {
    if ("number" != typeof r || r < 1) throw new RangeError(`expected maxChunkSize > 0 but got ${r}`);
    for (let a = 0; a < t; a++) {
      let t = a + r;
      n.push(e.slice(a, t)), a = t - 1;
    }
  }
  return n;
}

function arrayChunkSplit(e, r) {
  if ("number" != typeof r || r < 1) throw new RangeError(`expected maxChunkLength > 0 but got ${r}`);
  return arrayChunkBySize(e, Math.max(Math.round(e.length / r), 1));
}

export { arrayChunkBySize, arrayChunkMap, arrayChunkSplit, arrayChunkSplit as default };
//# sourceMappingURL=index.esm.mjs.map
