'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arrayHyperUnique = require('array-hyper-unique');

function _core(fn, options) {
  return (target, propertyKey, descriptor) => {
    const old = descriptor.value;
    // @ts-ignore
    descriptor.value = function (...argv) {
      return fn(old.apply(this, argv), options);
    };
  };
}
function _coreAsync(fn, options) {
  return (target, propertyKey, descriptor) => {
    const old = descriptor.value;
    // @ts-ignore
    descriptor.value = function (...argv) {
      return old.apply(this, argv).then(value => fn(value, options));
    };
  };
}
function ArrayUniqueDecorator(options) {
  return _core(arrayHyperUnique.array_unique, options);
}
function ArrayUniqueOverwriteDecorator(options) {
  return _core(arrayHyperUnique.array_unique_overwrite, options);
}
function ArrayUniqueAsyncDecorator(options) {
  return _coreAsync(arrayHyperUnique.array_unique, options);
}
function ArrayUniqueOverwriteAsyncDecorator(options) {
  return _coreAsync(arrayHyperUnique.array_unique_overwrite, options);
}

exports.ArrayUniqueAsyncDecorator = ArrayUniqueAsyncDecorator;
exports.ArrayUniqueDecorator = ArrayUniqueDecorator;
exports.ArrayUniqueOverwriteAsyncDecorator = ArrayUniqueOverwriteAsyncDecorator;
exports.ArrayUniqueOverwriteDecorator = ArrayUniqueOverwriteDecorator;
exports.default = ArrayUniqueDecorator;
//# sourceMappingURL=index.cjs.development.cjs.map
