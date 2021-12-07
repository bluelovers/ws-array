'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hashSum = require('hash-sum');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hashSum__default = /*#__PURE__*/_interopDefaultLegacy(hashSum);

function handleOptions(options) {
  var _options$getKey;

  const getKey = (_options$getKey = options === null || options === void 0 ? void 0 : options.getKey) !== null && _options$getKey !== void 0 ? _options$getKey : item => hashSum__default["default"](item);
  return { ...options,
    getKey
  };
}
function arrayGroupToRecord(arr, options) {
  var _init;

  const {
    getKey,
    init
  } = handleOptions(options);
  return arr.reduce((map, item, index, arr) => {
    var _map$id;

    const id = getKey(item, index, arr);
    (_map$id = map[id]) !== null && _map$id !== void 0 ? _map$id : map[id] = [];
    map[id].push(item);
    return map;
  }, (_init = init === null || init === void 0 ? void 0 : init()) !== null && _init !== void 0 ? _init : {});
}
function arrayGroupToMap(arr, options) {
  var _init2;

  const {
    getKey,
    init
  } = handleOptions(options);
  return arr.reduce((map, item, index, arr) => {
    var _map$get;

    const id = getKey(item, index, arr);
    const a = (_map$get = map.get(id)) !== null && _map$get !== void 0 ? _map$get : [];
    a.push(item);
    map.set(id, a);
    return map;
  }, (_init2 = init === null || init === void 0 ? void 0 : init()) !== null && _init2 !== void 0 ? _init2 : new Map());
}
function sumGroup(group) {
  let len = 0;

  if (typeof group.forEach === 'undefined') {
    group = Object.values(group);
  }

  group.forEach(b => len += b.length);
  return len;
}

exports.arrayGroupToMap = arrayGroupToMap;
exports.arrayGroupToRecord = arrayGroupToRecord;
exports["default"] = arrayGroupToRecord;
exports.handleOptions = handleOptions;
exports.sumGroup = sumGroup;
//# sourceMappingURL=index.cjs.development.cjs.map
