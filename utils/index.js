const { defaultOptions } = require('../options/defaultOptions');
const fs = require('fs');
const path = require('path');

const typeMapping = {
  KAFKA: 'kafka',
  POSTGRESQL: 'postgresql',
  REDIS: 'redis',
  MONGODB: 'mongodb',
  AMQP: 'amqp',
  MYSQL: 'mysql'
};

const aliases = {
  amqp: ['rabbitmq']
};

const getType = function (x) {
  return Object.prototype.toString.call(x).slice(8, -1);
};

function getBindOptions(options) {
  const resolveOptions = {
    String: () => {
      return Object.assign({}, defaultOptions, {
        id: options
      });
    },
    Object: () => {
      return Object.assign({}, defaultOptions, options);
    },
    default: function () {
      return defaultOptions;
    }
  };

  return (resolveOptions[getType(options)] || resolveOptions.default)();
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
  const bindings = {
    String: () => {
      if (!key) return;
      binding[key] = value;
    },
    Array: () => {
      binding[key[0]] = new Array(value);
    },
    Object: () => {
      for (const subkey in key) {
        if (!binding[subkey]) {
          binding[subkey] = {};
        }
        setKey(binding[subkey], key[subkey], value);
      }
    },
    default: () => {}
  };
  return (bindings[getType(key)] || bindings.default)();
};

function mapKey(clientInfo, key) {
  if (
    clientInfo &&
    (clientInfo.mapping[key] || clientInfo.mapping[key] === '')
  ) {
    return clientInfo.mapping[key].key || clientInfo.mapping[key];
  }
  return key;
}

function getBindValue(clientInfo, filepath, bindOptions) {
  const filename = path.basename(filepath);

  if (
    clientInfo &&
    clientInfo.mapping[filename] &&
    clientInfo.mapping[filename].path
  ) {
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
  return fs.readFileSync(filepath).toString().trim();
}

function mapValue(clientInfo, key, value) {
  if (clientInfo && clientInfo.valueMapping && clientInfo.valueMapping[key]) {
    return clientInfo.valueMapping[key][value];
  }
  return value;
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

const isKnownServiceType = (type) =>
  fs.existsSync(path.join(__dirname, '..', 'clients', type));

function getClientInfo(type, client) {
  try {
    return require(path.join(__dirname, '..', 'clients', type, client));
  } catch (e) {
    return null;
  }
}

const isDefined = function (x) {
  if (typeof x === 'undefined' || x === null) {
    return false;
  }
  return true;
};

function getBindingDataPath(root, type, id) {
  try {
    const candidates = fs.readdirSync(root);
    for (const file of candidates) {
      const bindingType = fs
        .readFileSync(path.join(root, file, 'type'))
        .toString()
        .trim();
      if (
        bindingType === typeMapping[type] ||
        aliases[typeMapping[type]].includes(bindingType)
      ) {
        if (id === undefined || file.includes(id)) {
          return path.join(root, file);
        }
      }
    }
  } catch (err) {}
}

module.exports = {
  getBindOptions,
  filterObject,
  setKey,
  mapKey,
  getBindValue,
  mapValue,
  isKnownServiceType,
  getClientInfo,
  isDefined,
  getBindingDataPath
};
