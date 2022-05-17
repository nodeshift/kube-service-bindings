'use strict';
const fs = require('fs');
const path = require('path');
const { getBindOptions, setKey } = require('./utils/index.js');

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

// return the bindings requested
function getBinding(type, client, bindingOptions) {
  const bindOptions = getBindOptions(bindingOptions);

  const id = bindOptions.id;

  // validate we know about the type
  if (!fs.existsSync(path.join(__dirname, 'clients', type))) {
    throw new Error('Unknown service type');
  }

  // validate that we know about the requested client
  let clientInfo;
  if (client) {
    try {
      clientInfo = require(path.join(__dirname, 'clients', type, client));
    } catch (e) {
      throw new Error('Unknown client');
    }
  }

  // find the matching binding
  let bindingsRoot = null;
  const root = process.env.SERVICE_BINDING_ROOT;

  if (!root) {
    throw new Error('No SERVICE_BINDING_ROOT env variable Found');
  }

  const candidates = fs.readdirSync(root);
  for (const file of candidates) {
    try {
      const bindingType = fs
        .readFileSync(path.join(root, file, 'type'))
        .toString()
        .trim();
      if (
        bindingType === typeMapping[type] ||
        aliases[typeMapping[type]].includes(bindingType)
      ) {
        if (id === undefined || file.includes(id)) {
          bindingsRoot = path.join(root, file);
          break;
        }
      }
    } catch (err) {}
  }

  // bail if we did not find a binding
  if (bindingsRoot == null) {
    throw new Error('No Binding Found');
  }

  // read and convert the available binding info
  const binding = {};
  const bindingFiles = fs.readdirSync(bindingsRoot);
  bindingFiles
    .filter((file) => !file.startsWith('..'))
    .forEach((file) => {
      let key = file;
      let value = fs
        .readFileSync(path.join(bindingsRoot, file))
        .toString()
        .trim();

      if (client) {
        if (clientInfo.mapping[key] || clientInfo.mapping[key] === '') {
          key = clientInfo.mapping[key];
        }

        // get the value and map if needed
        if (clientInfo.valueMapping && clientInfo.valueMapping[key]) {
          value = clientInfo.valueMapping[key][value];
        }

        // set the key
        setKey(binding, key, value);

        // do any final transforms needed
        if (clientInfo.transform) {
          clientInfo.transform(binding);
        }
      } else {
        setKey(binding, key, value);
      }
    });

  if (client && clientInfo.filter && bindOptions.removeUnmapped) {
    return clientInfo.filter(binding);
  }

  return binding;
}

module.exports.getBinding = getBinding;
