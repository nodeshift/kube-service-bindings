# kube-service-bindings

![CI](https://github.com/nodeshift/kube-service-bindings/workflows/Node.js%20CI/badge.svg)

Service bindings is [kubernetes](https://kubernetes.io/) spec on
how to communicate service secrets to applications in an automated way.
The spec is available [here](https://github.com/k8s-service-bindings/spec).

The goal of this package is to make it easy for Node.js
applications to consume these secrets, without requiring developers
to be familiar with service bindings.

The package provides the `getBinding` method which does roughly
the following:

* Looks for the $SERVICE_BINDING_ROOT variable in order
  to determine if bindings are available.
* Reads the info from the files. 
* Maps the names of the files to the options names needed by the
  Node.js clients that will connect to the service.  

The parameters for `getBinding` include:

* `type` - The type of service for which a binding is being
  requested. Currently the supported types are:
  * 'KAFKA'
  * 'POSTGRESQL'
  * 'REDIS'
  * 'MONGODB'
  * 'AMQP'

* `client` - the package the application is using to connect
  to the service. kube-service-bindings is aware of a
  subset of possible packages. For those that it is aware
  of, it can map the service bindings into the form 
  required by the client. Currently the following clients
  are recognized based on the supported types:
  * KAFKA
    * node-rdkafka
    * kafkajs
  * POSTGRESQL
    * pg
  * REDIS
    * redis
    * ioredis
  * MONGODB
    * mongodb
  * AMQP
    * rhea

  If you don't specify a client, the object returned will
  be a direct map from the bindings, with the keys
  corresponding to the name of each file provided by the
  binding.

* `id` - option id that is used to filter the available
  bindings in the search. Most useful for testing where
  you might have more than one binding of a given type
  available.

This is an example of how kube-service-bindings  might
be used:

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
