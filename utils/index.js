const { defaultOptions } = require('../options/defaultOptions');

const isString = function (x) {
  return !!(typeof x === 'string' || x instanceof String);
};

const isObject = function (x) {
  return typeof x === 'object' && !Array.isArray(x) && x !== null;
};

const isArray = function (x) {
  return Array.isArray(x);
};

const getBindOptions = function (options) {
  if (isString(options)) {
    return Object.assign({}, defaultOptions, {
      id: options
    });
  } else if (isObject(options)) {
    return Object.assign({}, defaultOptions, options);
  } else {
    return defaultOptions;
  }
};

const filterObject = function (object, keys) {
  return Object.keys(object)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};

// depending on the type of the key this will
// either set the value directly on the binding object
// passed in or create a sub-object on the binding and
// then call setKey recursively to set the value
const setKey = function (binding, key, value) {
  if (!key) return;

  if (isString(key)) {
    binding[key] = value;
    return;
  }
  if (isArray(key)) {
    binding[key[0]] = new Array(value);
    return;
  }
  if (isObject(key)) {
    for (const subkey in key) {
      if (!binding[subkey]) {
        binding[subkey] = {};
      }
      setKey(binding[subkey], key[subkey], value);
    }
  }
};

module.exports = {
  isString,
  isObject,
  isArray,
  getBindOptions,
  filterObject,
  setKey
};
