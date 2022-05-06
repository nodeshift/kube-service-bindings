const { defaultOptions } = require('../options/defaultOptions');

const getType = function (x) {
  return Object.prototype.toString.call(x).slice(8, -1);
};

const isString = function (x) {
  return getType(x) === 'String';
};

const isObject = function (x) {
  return getType(x) === 'Object';
};

const isArray = function (x) {
  return getType(x) === 'Array';
};

function getBindOptions(options) {
  const type = getType(options);

  const isString = function () {
    return Object.assign({}, defaultOptions, {
      id: options
    });
  };

  const isObject = function () {
    return Object.assign({}, defaultOptions, options);
  };

  const resolveOptions = {
    String: isString,
    Object: isObject,
    default: function () {
      return defaultOptions;
    }
  };

  return (resolveOptions[type] || resolveOptions.default)();
}

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
  getBindOptions,
  filterObject,
  setKey
};
