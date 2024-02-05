'use strict';

function deepEqual(val1, val2) {
    if (val1 === val2) {
        return true;
    }

    if (typeof val1 !== 'object' || val1 === null || typeof val2 !== 'object' || val2 === null) {
        return false;
    }

    // Check if one is an array and the other is not
    if (Array.isArray(val1) !== Array.isArray(val2)) {
        return false;
    }

    if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) return false;
        for (let i = 0; i < val1.length; i++) {
            if (!deepEqual(val1[i], val2[i])) return false;
        }
        return true;
    }

    if (val1 instanceof Map && val2 instanceof Map) {
        if (val1.size !== val2.size) return false;
        for (let [key, value] of val1) {
            if (!val2.has(key) || !deepEqual(value, val2.get(key))) return false;
        }
        return true;
    }

    if (val1 instanceof Set && val2 instanceof Set) {
        if (val1.size !== val2.size) return false;
        for (let item of val1) {
            if (!val2.has(item)) return false;
        }
        return true;
    }

    const keysVal1 = Object.keys(val1);
    const keysVal2 = Object.keys(val2);

    if (keysVal1.length !== keysVal2.length) {
        return false;
    }

    for (let key of keysVal1) {
        if (!keysVal2.includes(key) || !deepEqual(val1[key], val2[key])) {
            return false;
        }
    }

    return true;
}

module.exports = deepEqual;
