'use strict';
const fs = require('fs');
const path = require('path');

const  services = new Object();

// services and clients that kube-service-bindings understands
services['KAFKA'] =
  { 'type': 'kafka',
    'clients': { 
      'node-rdkafka': { 'mapping': { 'securityProtocol': 'security.protocol',
                                     'bootstrapServers': 'bootstrap.servers',
                                     'clientId': 'client.id',
                                     'saslMechanism': 'sasl.mechanisms',
                                     'type': '',
                                     'provider': '',
                                     'clientSecret': '',
                                     'user': 'sasl.username',
                                     'password': 'sasl.password'
                                   },
	              },
      'kafkajs'     : { 'mapping': { 'securityProtocol': 'ssl',
                                     'bootstrapServers': ['brokers'],
                                     'clientId': 'clientId',
                                     'saslMechanism': {'sasl': 'mechanism'},
                                     'type': '',
                                     'provider': '',
                                     'clientSecret': '',
                                     'user': { 'sasl': 'username' },
                                     'password': { 'sasl': 'password' }
                                   },
	                'valueMapping': { 'ssl': { 'SASL_SSL': true } },
	                'transform': (binding) => {
			  if (binding.sasl && binding.sasl.mechanism) {
		            binding.sasl.mechanism = binding.sasl.mechanism.toLowerCase();
	                  }
			}
	              }
    }
  };

// depending on the type of the key this will
// either set the value directory on the binding object
// passed in or create a subobject on the binding and
// then call setKey recursively to set the value
function setKey(binding, key, value) {
  if (key) {
    if (typeof key === "string") {
      binding[key] =  value;
    } else if (typeof key === "object") {
      if (Array.isArray(key)) {
        binding[key[0]] = new Array(value);
      } else {
        for (let subkey in key) {
          if (!binding[subkey]) {
            binding[subkey] = new Object();
          }
          setKey(binding[subkey], key[subkey], value);
        }
      }
    }
  }
}

// return the bidings requested
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
      let value =
          fs.readFileSync(path.join(bindingsRoot, file)).toString();

      if (client) {
	const clientInfo = services[type].clients[client];
        if (client && (clientInfo.mapping[key] ||
                       clientInfo.mapping[key] === '')) {
          key = clientInfo.mapping[key];
        }

        // get the value and map if needed
        if ((clientInfo.valueMapping) &&
            (clientInfo.valueMapping[key])) {
          value = clientInfo.valueMapping[key][value];
	}

        // set the key
        setKey(binding, key, value);

        // do any final transforms needed
        if(clientInfo.transform) {
          clientInfo.transform(binding);
        }
      } else {
        setKey(binding, key, value);
      }
    }
  });

 return binding;
}

module.exports.getBinding = getBinding;
