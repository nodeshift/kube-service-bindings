const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

describe('test-kafka-bindings', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('test-kafkajs', () => {
    const binding = bindings.getBinding('KAFKA', 'kafkajs');
    assert(binding);
    assert.deepEqual(binding, {
      brokers: ['test-boostrap:443'],
      clientId: 'client1',
      sasl: { password: 'pass1', mechanism: 'plain', username: 'user1' },
      ssl: true
    });
  });

  it('test-node-rdkafka', () => {
    const binding = bindings.getBinding('KAFKA', 'node-rdkafka');
    assert(binding);
    assert.deepEqual(binding, {
      'bootstrap.servers': 'test-boostrap:443',
      'client.id': 'client1',
      'sasl.mechanisms': 'PLAIN',
      'sasl.password': 'pass1',
      'sasl.username': 'user1',
      'security.protocol': 'SASL_SSL'
    });
  });

  after(() => {
    process.env = env;
  });
});
