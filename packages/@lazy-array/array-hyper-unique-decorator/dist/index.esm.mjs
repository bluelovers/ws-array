import { array_unique as r, array_unique_overwrite as e } from "array-hyper-unique";

function _core(r, e) {
  return (n, o, t) => {
    const c = t.value;
    t.value = function(...n) {
      return r(c.apply(this, n), e);
    };
  };
}

function _coreAsync(r, e) {
  return (n, o, t) => {
    const c = t.value;
    t.value = function(...n) {
      return c.apply(this, n).then((n => r(n, e)));
    };
  };
}

function ArrayUniqueDecorator(e) {
  return _core(r, e);
}

function ArrayUniqueOverwriteDecorator(r) {
  return _core(e, r);
}

function ArrayUniqueAsyncDecorator(e) {
  return _coreAsync(r, e);
}

function ArrayUniqueOverwriteAsyncDecorator(r) {
  return _coreAsync(e, r);
}

export { ArrayUniqueAsyncDecorator, ArrayUniqueDecorator, ArrayUniqueOverwriteAsyncDecorator, ArrayUniqueOverwriteDecorator, ArrayUniqueDecorator as default };
//# sourceMappingURL=index.esm.mjs.map
