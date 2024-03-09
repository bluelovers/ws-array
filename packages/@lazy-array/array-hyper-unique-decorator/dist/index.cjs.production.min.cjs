"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var r = require("array-hyper-unique");

function _core(r, e) {
  return (n, t, o) => {
    const u = o.value;
    o.value = function(...n) {
      return r(u.apply(this, n), e);
    };
  };
}

function _coreAsync(r, e) {
  return (n, t, o) => {
    const u = o.value;
    o.value = function(...n) {
      return u.apply(this, n).then((n => r(n, e)));
    };
  };
}

function ArrayUniqueDecorator(e) {
  return _core(r.array_unique, e);
}

exports.ArrayUniqueAsyncDecorator = function ArrayUniqueAsyncDecorator(e) {
  return _coreAsync(r.array_unique, e);
}, exports.ArrayUniqueDecorator = ArrayUniqueDecorator, exports.ArrayUniqueOverwriteAsyncDecorator = function ArrayUniqueOverwriteAsyncDecorator(e) {
  return _coreAsync(r.array_unique_overwrite, e);
}, exports.ArrayUniqueOverwriteDecorator = function ArrayUniqueOverwriteDecorator(e) {
  return _core(r.array_unique_overwrite, e);
}, exports.default = ArrayUniqueDecorator;
//# sourceMappingURL=index.cjs.production.min.cjs.map
