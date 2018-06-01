"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equals = require("deep-eql");
function lazy_unique(...arr) {
    if (arr.length > 1) {
        return array_unique(arr);
    }
    return array_unique(arr[0]);
}
exports.lazy_unique = lazy_unique;
function array_unique(arr, options = {}) {
    if (!Array.isArray(arr)) {
        throw new TypeError(`Expected an Array but got ${typeof arr}.`);
    }
    const cb = defaultFilter(options);
    if (options.overwrite) {
        let index = arr.length;
        while (index--) {
            let val = arr[index];
            if (!cb(val, index, arr)) {
                arr.splice(index, 1);
            }
        }
        return arr;
    }
    return arr.filter(cb);
}
exports.array_unique = array_unique;
function lazy_unique_overwrite(...arr) {
    if (arr.length > 1) {
        return array_unique_overwrite(arr);
    }
    return array_unique_overwrite(arr[0]);
}
exports.lazy_unique_overwrite = lazy_unique_overwrite;
function array_unique_overwrite(arr, options = {}) {
    let opts = Object.assign({}, options, {
        overwrite: true,
    });
    return array_unique(arr, opts);
}
exports.array_unique_overwrite = array_unique_overwrite;
function defaultFilter(options = {}) {
    const checker = options.checker || defaultChecker;
    const filter = options.filter || null;
    const cb = (val, index, arr) => {
        let i = arr.findIndex(a => checker(a, val, arr, arr));
        return i == index && (!filter || filter(val));
    };
    return cb;
}
exports.defaultFilter = defaultFilter;
function defaultChecker(element, value, arr_new, arr_old) {
    return equals(element, value);
}
exports.defaultChecker = defaultChecker;
exports.default = lazy_unique;
