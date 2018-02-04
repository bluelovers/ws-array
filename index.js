"use strict";
function sortObject(object, sortWith) {
    let options = {};
    if (typeof sortWith === 'function') {
        options.sort = sortWith;
    }
    else if (Array.isArray(sortWith)) {
        options.keys = sortWith;
    }
    else {
        options = Object.assign(options, sortWith);
    }
    let keys = (options.keys || []);
    if (options.onlyKeys) {
        options.useSource = false;
    }
    else {
        keys = keys.concat()
            .concat(Object.keys(object).sort(options.sort));
    }
    let ret = keys.reduce(function (total, key) {
        if (options.allowNotExists || key in object) {
            total[key] = object[key];
        }
        return total;
    }, {});
    if (options.useSource) {
        Object.keys(ret)
            .forEach(function (key, index, array) {
            delete object[key];
            object[key] = ret[key];
        });
        return object;
    }
    return ret;
}
module.exports = sortObject;
