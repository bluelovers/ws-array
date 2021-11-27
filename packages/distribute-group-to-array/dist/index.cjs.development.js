'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _createGroupArray(length) {
  const arr = [];

  for (let i = 0; i < length; i++) {
    arr.push([]);
  }

  return arr;
}
function distributeGroupToArrayCore(group, options) {
  var _options$init, _options$init2, _options$groupArraySi;

  if (typeof group.entries !== 'undefined') {
    group = mapToRecord(group);
  }

  const arr = (_options$init = options === null || options === void 0 ? void 0 : (_options$init2 = options.init) === null || _options$init2 === void 0 ? void 0 : _options$init2.call(options)) !== null && _options$init !== void 0 ? _options$init : _createGroupArray((_options$groupArraySi = options === null || options === void 0 ? void 0 : options.groupArraySize) !== null && _options$groupArraySi !== void 0 ? _options$groupArraySi : 4);
  const len = arr.length;
  const {
    names,
    record
  } = Object.entries(group).reduce((a, [k, v]) => {
    a.names.push(k);
    a.record[k] = v.slice();
    return a;
  }, {
    names: [],
    record: {}
  });
  let i = len - 1;

  do {
    let item;

    for (let name of names) {
      var _record$name;

      item = (_record$name = record[name]) === null || _record$name === void 0 ? void 0 : _record$name.pop();

      if (item) {
        arr[i % len].push(item);
      } else {
        delete record[name];
      }
    }

    if (item) {
      i++;
    }
  } while (Object.keys(record).length);

  return arr;
}
function mapToRecord(map) {
  const record = {};

  for (let [k, v] of map.entries()) {
    record[k] = v;
  }

  return record;
}
function distributeGroupToArray(group, options) {
  return distributeGroupToArrayCore(group, options).flat();
}

exports._createGroupArray = _createGroupArray;
exports["default"] = distributeGroupToArray;
exports.distributeGroupToArray = distributeGroupToArray;
exports.distributeGroupToArrayCore = distributeGroupToArrayCore;
exports.mapToRecord = mapToRecord;
//# sourceMappingURL=index.cjs.development.js.map
