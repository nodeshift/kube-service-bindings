const { defaultOptions } = require('../options/defaultOptions');
const fs = require('fs');
const path = require('path');

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
  bindingsRoot,
  filename,
  key,
  bindOptions
}) {
  const filepath = path.join(bindingsRoot, filename);

  const fileContent = fs.readFileSync(filepath).toString().trim();

  if (!client) {
    return fileContent;
  }

  if (clientInfo.mapping[filename] && clientInfo.mapping[filename].path) {
    if (clientInfo.mapping[filename].copy && bindOptions.allowCopy === true) {
      const prefix = 'tmp-';
      const tempfolder = fs.mkdtempSync(prefix, { encoding: 'utf8' });
      const newFilepath = path.join('.', tempfolder, path.basename(filepath));
      fs.copyFileSync(filepath, newFilepath);
      fs.chmodSync(newFilepath, 0o600);
      return newFilepath;
    }

    showFilePermissionsWarningMessage(
      clientInfo.mapping[filename].copy,
      bindOptions.allowCopy,
      filename
    );

    return filepath;
  }

  // get the value and map if needed
  if (clientInfo.valueMapping && clientInfo.valueMapping[key]) {
    return clientInfo.valueMapping[key][fileContent];
  }

  return fileContent;
}

function showFilePermissionsWarningMessage(itCanBeCopied, allowCopy, filename) {
  if (itCanBeCopied && allowCopy === false) {
    const warnMessage = [
      `Warning: File ${filename} does not have proper permissions.`,
      'Set allowCopy option to true, for copy/pasting file with proper permissions under app directory.',
      '**By enabling this options, this might be a potential security risk**'
    ].join('\n');
    console.log(warnMessage);
  }
}

// Returns a concatenated list of options parameters defined in the bound file `options` in the format specified in
// PostgreSQL Doc:
//   https://www.postgresql.org/docs/14/libpq-connect.html
//   e.g.: -c opt=val
//
// CockroachDB Cloud, which shares the same `postgresql://` protocol as PostgreSQL, has a customized option for its
// multi-tenant hosts: `--cluster=<host_name>`
// Reference:
//   https://www.cockroachlabs.com/docs/v21.2/connection-parameters#additional-connection-parameters
//
function buildOptionParam(bindOpt) {
  // expected raw options format: key1=val1&key2=val2...
  const optList = [];
  bindOpt
    .split('&')
    .map((item) => item.split('='))
    .filter(([key, value]) => {
      return key && value;
    })
    .forEach(function ([key, value]) {
      if (key === '--cluster') {
        optList.unshift(`${key}=${value}`);
      } else {
        // e.g.: -c opt=val
        optList.push(`-c ${key}=${value}`);
      }
    });
  return optList.join(' ');
}

module.exports = {
  getBindOptions,
  filterObject,
  setKey,
  getKeyMapping,
  getValueMapping,
  buildOptionParam
};
