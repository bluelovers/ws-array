import hashSum from 'hash-sum';

function handleOptions(options) {
  var _options$getKey;

  const getKey = (_options$getKey = options === null || options === void 0 ? void 0 : options.getKey) !== null && _options$getKey !== void 0 ? _options$getKey : item => hashSum(item);
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

export { arrayGroupToMap, arrayGroupToRecord, arrayGroupToRecord as default, handleOptions, sumGroup };
//# sourceMappingURL=index.esm.js.map
