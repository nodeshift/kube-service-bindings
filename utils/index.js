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

module.exports = {
  isString,
  isObject,
  isArray,
  getBindOptions,
  filterObject
};
