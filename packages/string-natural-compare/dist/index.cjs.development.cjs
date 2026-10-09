'use strict';

var require$$0 = require('tslib');

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var src;
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  const tslib_1 = require$$0;
  const index_1 = tslib_1.__importDefault(requireSrc());
  src = index_1.default;
  return src;
}

var srcExports = requireSrc();
var naturalCompare = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

// @ts-ignore
module.exports = naturalCompare;
//# sourceMappingURL=index.cjs.development.cjs.map
