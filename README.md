# kube-service-bindings

Service bindings is [kubernetes](https://kubernetes.io/) spec on
how to communicate service secrets to applications in an automated way.
The spec is available [here](https://github.com/k8s-service-bindings/spec).

The goal of this package is to make it easy for Node.js
applications to consume these secrets, without requiring developers
to be familiar with service bindings.

![CI](https://github.com/nodeshift/kube-service-bindings/workflows/Node.js%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/nodeshift/kube-service-bindings/badge.svg?branch=main)](https://coveralls.io/github/nodeshift/kube-service-bindings?branch=main)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![NPM version](https://img.shields.io/npm/v/kube-service-bindings.svg)](https://www.npmjs.com/package/kube-service-bindings)

# Install

```
npm install kube-service-bindings --save
```

# Supported Node.js Versions

**kube-service-bindings** supports and is tested only on the current, maintenance and active [Node.js LTS versions](https://github.com/nodejs/Release#release-schedule). We will bump the major version in a release of kube-service-bindings soon after an LTS version of Node.js goes EOL.

# Usage

The package provides the `getBinding` method which does roughly
the following:

- Looks for the $SERVICE_BINDING_ROOT variable in order
  to determine if bindings are available.
- Reads the info from the files.
- Maps the names of the files to the options names needed by the
  Node.js clients that will connect to the service.

## getBinding(type, client, bindingOptions)

This is an example of how kube-service-bindings might be used:

```JavaScript
const Kafka = require('node-rdkafka');
const serviceBindings = require('kube-service-bindings');

try {
  // check if the deployment has been bound to a kafka instance through
  // service bindings. If so use that connect info
  kafkaConnectionBindings = serviceBindings.getBinding('KAFKA', 'node-rdkafka');
} catch (err) { // proper error handling here
};

const stream = Kafka.KafkaConsumer.createReadStream(
  Object.assign({
    'group.id': 'consumer-test', // identifier to use to help trace activity in Kafka
    'socket.keepalive.enable': true, // Enable TCP keep-alives on broker sockets
    'enable.auto.commit': false // Automatically and periodically commit offsets in the background.
  }, kafkaConnectionBindings),
  {},
  {
    topics: 'countries'
  }
);
```

The parameters for `getBinding` include:

| Parameter                         | Type     |
| --------------------------------- | -------- |
| [type](#type)                     | `String` |
| [client](#client)                 | `String` |
| [bindingOptions](#bindingoptions) | `Object` |

### type

The type of service for which a binding is being
requested. Currently the supported types are:

- 'KAFKA'
- 'POSTGRESQL'
- 'REDIS'
- 'MONGODB'
- 'AMQP'
- 'MYSQL'

### client

The package the application is using to connect
to the service. kube-service-bindings is aware of a
subset of possible packages. For those that it is aware
of, it can map the service bindings into the form
required by the client.

Currently the following clients are recognized based on the supported types:

- KAFKA
  - node-rdkafka
  - kafkajs
- POSTGRESQL
  - pg
  - odbc
- REDIS
  - redis
  - ioredis
- MONGODB
  - mongodb
  - mongoose
- AMQP
  - rhea
- MYSQL
  - mysql
  - mysql2
  - odbc

**(Deprecated)** If you don't specify a client, the object returned will
be a direct map from the bindings, with the keys
corresponding to the name of each file provided by the
binding.

#### Example on mongoDB client

```javascript
const serviceBindings = require('kube-service-bindings');
const { MongoClient } = require('mongodb');

const { url, connectionOptions } = serviceBindings.getBinding(
  'MONGODB',
  'mongodb'
);

const mongoClient = new MongoClient(url, connectionOptions);
```

### bindingOptions

An object where provides control on parsing binding data.

| Attribute                         | type      | default Value |
| --------------------------------- | --------- | ------------- |
| [id](#id)                         | `String`  | undefined     |
| [removeUnmapped](#removeunmapped) | `Boolean` | true          |
| [allwCopy](#allowcopy)            | `Boolean` | false         |
| [bindingData](#bindingdata)       | `Object`  | undefined     |

#### id

Option id that is used to filter the available bindings in the search. Most useful for testing where you might have more than one binding of a given type available.

#### removeUnmapped

Fine grains parsed binding data to fit for the specified client, removing unnecessary properties from the input object.

#### allowCopy

Enables setting proper permissions for some of the binding data, where the system has not provided them correctly. It allows binding files content to be copied/stored in a new file and directory. This has to be enabled by the user in order to be aware of the security risk, as some files might include sensitive material. E.x. connecting to postgresql with odbc client, throws the following error for the tls.key file `permissions should be u=rw (0600) or less`.

#### bindingData

An object for passing binding data to kube-service-bindings. This is useful especially in local dev environtment or as a fallback in case of binding data are not available.

Example 1 mongodb client:

```javascript
let url;
let connectionOptions;

try {
  ({ url, connectionOptions } = serviceBindings.getBinding(
    'MONGODB',
    'mongodb'
  ));
} catch (err) {
  ({ url, connectionOptions } = serviceBindings.getBinding(
    'MONGODB',
    'mongodb',
    {
      host: 'mongodb.host.com',
      password: 'password',
      port: 27017,
      username: 'user1'
    }
  ));
}
```

Example 2 kafkajs client:

```javascript
let kafkaConnectionBindings;

try {
  kafkaConnectionBindings = serviceBindings.getBinding('KAFKA', 'kafkajs');
} catch (err) {
  kafkaConnectionBindings = serviceBindings.getBinding('KAFKA', 'kafkajs', {
    bootstrapServers: 'test-boostrap:443',
    clientId: 'client1',
    clientSecret: 'pass1',
    password: 'pass1',
    provider: 'rhoas',
    saslMechanism: 'PLAIN',
    securityProtocol: 'SASL_SSL',
    type: 'kafka',
    user: 'user1'
  });
}
```

  <!--
  | case | Arg1 | Arg2        | Arg3        | Supported | deprecate |
  | ---- | ---- | ----------- | ----------- | --------- | --------- |
  | 1    | -    | -           | -           | true      | -         |
  | 2    | type | -           | -           | true      | true      |
  | 3    | type | id          | -           | false     |           |
  | 4    | type | bindOptions | -           | true      | true      |
  | 5    | type | client      | -           | true      | -         |
  | 6    | type | client      | id          | true      | true      |
  | 7    | type | client      | bindOptions | true      | -         | -->
