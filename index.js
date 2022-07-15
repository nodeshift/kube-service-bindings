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
  isDefined,
  getBindingDataPath
} = require('./utils/index.js');


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

  const bindingDataPath = getBindingDataPath(root, type, bindOptions.id);
  if (!isDefined(bindingDataPath)) {
    throw new Error('No Binding Found');
  }

  const binding = {};
  fs.readdirSync(bindingDataPath)
    .filter((filename) => !filename.startsWith('..'))
    .map((filename) => [
      filename,
      getBindValue(
        clientInfo,
        path.join(bindingDataPath, filename),
        bindOptions
      )
    ])
    .map(([key, value]) => [mapKey(clientInfo, key), value])
    .map(([key, value]) => [key, mapValue(clientInfo, key, value)])
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
