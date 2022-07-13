'use strict';
const fs = require('fs');
const path = require('path');
const {
  getBindOptions,
  setKey,
  mapKey,
  getBindValue,
  mapValue,
  isKnownServiceType,
  getClientInfo,
  isDefined
} = require('./utils/index.js');

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

  if (!isKnownServiceType(type)) {
    throw new Error('Unknown service type');
  }

  let clientInfo;
  if (isDefined(client)) {
    clientInfo = getClientInfo(type, client);
    if (clientInfo === null) {
      throw new Error('Unknown client');
    }
  }

  const root = process.env.SERVICE_BINDING_ROOT;
  if (!root) {
    throw new Error('No SERVICE_BINDING_ROOT env variable Found');
  }

  // find the matching binding
  let bindingsRoot = null;

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
        if (bindOptions.id === undefined || file.includes(bindOptions.id)) {
          bindingsRoot = path.join(root, file);
          break;
        }
      }
    } catch (err) {}
  }

  // bail if we did not find a binding
  if (bindingsRoot === null) {
    throw new Error('No Binding Found');
  }

  // read and convert the available binding info
  const binding = {};
  const bindingFiles = fs.readdirSync(bindingsRoot);
  bindingFiles
    .filter((filename) => !filename.startsWith('..'))
    .map((filename) => path.join(bindingsRoot, filename))
    .map((filepath) => [
      mapKey(clientInfo, filepath),
      getBindValue(clientInfo, filepath, bindOptions)
    ])
    .map(([mappedKey, value]) => [
      mappedKey,
      mapValue(clientInfo, mappedKey, value)
    ])
    .forEach(([mappedKey, mappedValue]) =>
      setKey(binding, mappedKey, mappedValue)
    );

  // do any final transforms needed
  if (client && clientInfo.transform) {
    clientInfo.transform(binding);
  }

  // do any final filter needed
  if (client && clientInfo.filter && bindOptions.removeUnmapped) {
    return clientInfo.filter(binding);
  }

  return binding;
}

module.exports.getBinding = getBinding;
