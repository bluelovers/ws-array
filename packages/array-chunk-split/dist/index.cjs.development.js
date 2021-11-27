'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function arrayChunkMap(options) {
  const {
    inputArray,
    maxChunkLength,
    maxChunkSize
  } = options;
  let {
    mapMethod
  } = options;
  let result;

  if (maxChunkLength != null) {
    result = arrayChunkSplit(inputArray, maxChunkLength);
  } else if (maxChunkSize != null) {
    result = arrayChunkBySize(inputArray, maxChunkSize);
  } else {
    throw new TypeError(`maxChunkLength or maxChunkSize is required`);
  }

  if (typeof mapMethod !== 'function') {
    if (mapMethod) {
      mapMethod = value => value[value.length - 1];
    } else {
      mapMethod = value => value[0];
    }
  }

  return result.map(mapMethod);
}
function arrayChunkBySize(arr, maxChunkSize) {
  const result = [];
  const {
    length
  } = arr;

  if (typeof maxChunkSize !== 'number' || maxChunkSize < 1) {
    throw new RangeError(`expected maxChunkSize > 0 but got ${maxChunkSize}`);
  }

  for (let i = 0; i < length; i++) {
    let next = i + maxChunkSize;
    result.push(arr.slice(i, next));
    i = next - 1;
  }

  return result;
}
function arrayChunkSplit(arr, maxChunkLength) {
  if (typeof maxChunkLength !== 'number' || maxChunkLength < 1) {
    throw new RangeError(`expected maxChunkLength > 0 but got ${maxChunkLength}`);
  }

  const maxChunkSize = Math.max(Math.round(arr.length / maxChunkLength), 1);
  return arrayChunkBySize(arr, maxChunkSize);
}

exports.arrayChunkBySize = arrayChunkBySize;
exports.arrayChunkMap = arrayChunkMap;
exports.arrayChunkSplit = arrayChunkSplit;
exports["default"] = arrayChunkSplit;
//# sourceMappingURL=index.cjs.development.js.map