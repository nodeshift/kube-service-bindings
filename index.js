'use strict';
const fs = require('fs');
const path = require('path');

const  services = new Object();
services['KAFKA'] =
  { 'type': 'kafka',
    'clients': { 
      'node-rdkafka': { 'securityProtocol': 'security.protocol',
                        'bootstrapServers': 'bootstrap.servers',
                        'clientId': 'client.id',
                        'saslMechanism': 'sasl.mechanisms',
                        'type': '',
                        'provider': '',
                        'user': 'sasl.username',
                        'password': 'sasl.password'
                      }
    }
  };



function getBinding(type, client, id) {
  // validate we know about the type
  if (!services[type]) {
    throw new Error('Unknown service type');
  }

  // validate that we know about the requested client
  if (client && (!services[type].clients ||
	         !services[type].clients[client])) {
    throw new Error('Unknown client');
  }

  // find the matching binding
  let bindingsRoot = null;
  const root = process.env['SERVICE_BINDING_ROOT'];
  if (root) {
    const candidates = fs.readdirSync(root);
    for (let file of candidates) {
      try {
        const bindingType =
          fs.readFileSync(path.join(root, file, 'type')).toString().trim();
        if (bindingType === services[type].type) {
          if ((id === undefined) || file.includes(id)) {
            bindingsRoot = path.join(root,file);
            break;
          }
        };
      } catch (err) { };
    };
  };

  // bail if we did not find a binding
  if (bindingsRoot == null) {
    throw new Error('No Binding Found');
  }


  // read and convert the available binding info
  let binding = new Object();
  const bindingFiles = fs.readdirSync(bindingsRoot);
  bindingFiles.forEach((file) => {
    if (!file.startsWith('..')) {
      let key = file;
      if (client && (services[type].clients[client][key] ||
	             services[type].clients[client][key] === '')) {
        key = services[type].clients[client][key];
      }
      if (key) {
        binding[key] =
          fs.readFileSync(path.join(bindingsRoot, file)).toString();
      }
    }
  });

 return binding;
}

module.exports.getBinding = getBinding;
