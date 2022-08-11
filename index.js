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
  getBindingDataPath,
  getRawBindingData
} = require('./utils/index.js');

function getBinding(type, client, bindingOptions) {
  const bindOptions = getBindOptions(type, client, bindingOptions);

  const root = process.env.SERVICE_BINDING_ROOT;

  if (!isDefined(type)) {
    if (!root) {
      throw new Error('No SERVICE_BINDING_ROOT env variable Found');
    }
    return getRawBindingData(root);
  }

  // validate we know about the type
  if (isDefined(type) && !isKnownServiceType(type)) {
    throw new Error('Unknown service type');
  }

  // validate we know about the client
  const clientInfo = getClientInfo(type, client);
  if (isDefined(client) && !clientInfo) {
    throw new Error('Unknown client');
  }

  let bindingData;
  if (isDefined(bindOptions.bindingData)) {
    bindingData = Object.entries(bindOptions.bindingData);
  } else {
    if (!root) {
      throw new Error('No SERVICE_BINDING_ROOT env variable Found');
    }
    const bindingDataPath = getBindingDataPath(root, type, bindOptions.id);
    if (!isDefined(bindingDataPath)) {
      throw new Error('No Binding Found');
    }

    bindingData = fs
      .readdirSync(bindingDataPath)
      .filter((filename) => !filename.startsWith('..'))
      .map((filename) => [
        filename,
        getBindValue(
          clientInfo,
          path.join(bindingDataPath, filename),
          bindOptions
        )
      ]);
  }

  // read and convert the available binding info
  const binding = {};

  bindingData
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
