"use strict";
const equals = require("deep-eql");
function lazy_unique(...arr) {
    if (arr.length > 1) {
        return array_unique(arr);
    }
    return array_unique(arr[0]);
}
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
function lazy_unique_overwrite(...arr) {
    if (arr.length > 1) {
        return array_unique_overwrite(arr);
    }
    return array_unique_overwrite(arr[0]);
}
function array_unique_overwrite(arr, options = {}) {
    let opts = Object.assign({}, options, {
        overwrite: true,
    });
    return array_unique(arr, opts);
}
function defaultFilter(options = {}) {
    const checker = options.checker || defaultChecker;
    const filter = options.filter || null;
    const cb = (val, index, arr) => {
        let i = arr.findIndex(a => checker(a, val, arr, arr));
        return i == index && (!filter || filter(val));
    };
    return cb;
}
function defaultChecker(element, value, arr_new, arr_old) {
    return equals(element, value);
}
exports.default = lazy_unique;
(function (lazy_unique_1) {
})(lazy_unique = lazy_unique || (lazy_unique = {}));
Object.defineProperty(lazy_unique, "__esModule", { value: true });
Object.assign(lazy_unique, exports, {
    lazy_unique,
    array_unique,
    lazy_unique_overwrite,
    array_unique_overwrite,
    defaultChecker,
    defaultFilter,
    equals,
    default: lazy_unique,
});
Object.freeze(lazy_unique);
module.exports = lazy_unique;
