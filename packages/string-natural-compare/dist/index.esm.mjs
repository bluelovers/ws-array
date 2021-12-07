import _naturalCompare from 'string-natural-compare';

function naturalCompare(a, b, opts) {
  let i;

  if (typeof a === 'number' && typeof b === 'number') {
    i = a - b;
  } else {
    if (typeof a === 'number') {
      a = String(a);
    } else if (typeof b === 'number') {
      b = String(b);
    }

    if (a === b) {
      return 0;
    }

    i = _naturalCompare(a, b, opts);
  }

  if (i !== 0 && opts !== null && opts !== void 0 && opts.desc) {
    i = 0 - i;
  }

  return i;
}
function createNew(opts) {
  return (a, b) => naturalCompare(a, b, opts);
}
const compareCaseInsensitive = /*#__PURE__*/createNew({
  caseInsensitive: true
});
naturalCompare.createNew = createNew;
naturalCompare.compareCaseInsensitive = compareCaseInsensitive;
naturalCompare.caseInsensitive = compareCaseInsensitive;
naturalCompare.default = naturalCompare;
Object.defineProperty(naturalCompare, "__esModule", {
  value: true
});

export { compareCaseInsensitive as caseInsensitive, compareCaseInsensitive, createNew, naturalCompare as default, naturalCompare };
//# sourceMappingURL=index.esm.mjs.map
