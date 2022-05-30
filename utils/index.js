const { defaultOptions } = require('../options/defaultOptions');

const getType = function (x) {
  return Object.prototype.toString.call(x).slice(8, -1);
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
  const type = getType(key);

  const isString = function () {
    if (!key) return;
    binding[key] = value;
  };

  const isArray = function () {
    binding[key[0]] = new Array(value);
  };

  const isObject = function () {
    for (const subkey in key) {
      if (!binding[subkey]) {
        binding[subkey] = {};
      }
      setKey(binding[subkey], key[subkey], value);
    }
  };

  const bindings = {
    String: isString,
    Array: isArray,
    Object: isObject,
    default: function () {}
  };
  return (bindings[type] || bindings.default)();
};

function getKeyMapping({ client, clientInfo, filename }) {
  if (!client) {
    return filename;
  }
  if (clientInfo.mapping[filename] || clientInfo.mapping[filename] === '') {
    return clientInfo.mapping[filename].key || clientInfo.mapping[filename];
  }
  return filename;
}

function getValueMapping({
  client,
  clientInfo,
  filename,
  filepath,
  key,
  fileContent
}) {
  if (!client) {
    return fileContent;
  }

  if (clientInfo.mapping[filename] && clientInfo.mapping[filename].path) {
    return filepath;
  }

  // get the value and map if needed
  if (clientInfo.valueMapping && clientInfo.valueMapping[key]) {
    return clientInfo.valueMapping[key][fileContent];
  }

  return fileContent;
}

module.exports = {
  getBindOptions,
  filterObject,
  setKey,
  getKeyMapping,
  getValueMapping
};
