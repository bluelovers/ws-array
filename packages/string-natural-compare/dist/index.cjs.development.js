'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _naturalCompare = require('string-natural-compare');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _naturalCompare__default = /*#__PURE__*/_interopDefaultLegacy(_naturalCompare);

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

    i = _naturalCompare__default["default"](a, b, opts);
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

exports.caseInsensitive = compareCaseInsensitive;
exports.compareCaseInsensitive = compareCaseInsensitive;
exports.createNew = createNew;
exports["default"] = naturalCompare;
exports.naturalCompare = naturalCompare;
//# sourceMappingURL=index.cjs.development.js.map
