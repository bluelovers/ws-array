"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equals = require("deep-eql");
function lazy_unique(...arr) {
    if (arr.length == 0 || arr.length == 1 && !Array.isArray(arr[0])) {
        throw new TypeError(`Expected an Array but got ${typeof arr[0]}.`);
    }
    else if (arr.length == 1) {
        return array_unique(arr[0]);
    }
    return array_unique(arr);
}
exports.lazy_unique = lazy_unique;
function array_unique(arr, options = {}) {
    if (!Array.isArray(arr)) {
        throw new TypeError(`Expected an Array but got ${typeof arr}.`);
    }
    let checker = options.checker || defaultChecker;
    if (options.overwrite) {
        arr.forEach(function (val, index, array) {
            let i = array.findIndex(a => checker(a, val, array, arr));
            if (i !== index) {
                arr.splice(i, 1);
            }
            return i === index;
        });
        return arr;
    }
    return arr.reduce((acc, val) => {
        let i = acc.findIndex(a => checker(a, val, acc, arr));
        if (i == -1) {
            acc.push(val);
        }
        return acc;
    }, []);
}
exports.array_unique = array_unique;
function defaultChecker(element, value, arr_new, arr_old) {
    return equals(element, value);
}
exports.defaultChecker = defaultChecker;
exports.default = lazy_unique;
