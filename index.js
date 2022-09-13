'use strict';
const {
  getBindOptions,
  setKey,
  mapKey,
  getBindingData,
  mapValue,
  isKnownServiceType,
  getClientInfo,
  isDefined,
  getBindingDataPath,
  getRawBindingData
} = require('./utils/index.js');

const {
  errors: {
    NO_SERVICE_BINDING_ROOT,
    UNKNOWN_SERVICE_TYPE,
    UNKNOWN_CLIENT,
    NO_BINDING_FOUND
  }
} = require('./utils/messages/index.js');

function getBinding(type, client, bindingOptions) {
  const bindOptions = getBindOptions(type, client, bindingOptions);

  const root = process.env.SERVICE_BINDING_ROOT;
  if (!root && !isDefined(bindOptions.bindingData)) {
    throw new Error(NO_SERVICE_BINDING_ROOT);
  }

  if (!isDefined(type)) {
    return getRawBindingData(root);
  }

  // validate we know about the type
  if (!isKnownServiceType(type)) {
    throw new Error(UNKNOWN_SERVICE_TYPE);
  }

  // validate we know about the client
  const clientInfo = getClientInfo(type, client);
  if (isDefined(client) && !clientInfo) {
    throw new Error(UNKNOWN_CLIENT);
  }

  let bindingData;
  if (isDefined(bindOptions.bindingData)) {
    bindingData = Object.entries(bindOptions.bindingData);
  } else {
    const bindingDataPath = getBindingDataPath(root, type, bindOptions.id);
    if (!isDefined(bindingDataPath)) {
      throw new Error(NO_BINDING_FOUND);
    }
    bindingData = getBindingData(bindingDataPath, clientInfo, bindOptions);
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
