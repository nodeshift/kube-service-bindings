const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

const kafkajsConnectionCredentials = {
  brokers: ['test-boostrap:443'],
  clientId: 'client1',
  sasl: { password: 'pass1', mechanism: 'plain', username: 'user1' },
  ssl: true
};

const nodeRdkafkaConnectionCredentials = {
  'bootstrap.servers': 'test-boostrap:443',
  'client.id': 'client1',
  'sasl.mechanisms': 'PLAIN',
  'sasl.password': 'pass1',
  'sasl.username': 'user1',
  'security.protocol': 'SASL_SSL'
};

const bindingData = {
  bootstrapServers: 'test-boostrap:443',
  clientId: 'client1',
  clientSecret: 'pass1',
  password: 'pass1',
  provider: 'rhoas',
  saslMechanism: 'PLAIN',
  securityProtocol: 'SASL_SSL',
  type: 'kafka',
  user: 'user1'
};

describe('KAFKA', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  describe('kafkajs', () => {
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('KAFKA', 'kafkajs', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, kafkajsConnectionCredentials);
    });

    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('KAFKA', 'kafkajs', {
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, kafkajsConnectionCredentials);
    });

    it('Defaul behaviour', () => {
      const binding = bindings.getBinding('KAFKA', 'kafkajs');
      assert(binding);
      assert.deepEqual(binding, kafkajsConnectionCredentials);
    });
    describe('Passing bindng data as parameter.', () => {
      it('Do NOT Remove Unmapped Values', () => {
        const binding = bindings.getBinding('KAFKA', 'kafkajs', {
          bindingData,
          removeUnmapped: false
        });
        assert(binding);
        assert.deepEqual(binding, kafkajsConnectionCredentials);
      });

      it('Remove Unmapped Values', () => {
        const binding = bindings.getBinding('KAFKA', 'kafkajs', {
          bindingData,
          removeUnmapped: true
        });
        assert(binding);
        assert.deepEqual(binding, kafkajsConnectionCredentials);
      });

      it('Defaul behaviour', () => {
        const binding = bindings.getBinding('KAFKA', 'kafkajs', {
          bindingData
        });
        assert(binding);
        assert.deepEqual(binding, kafkajsConnectionCredentials);
      });
    });
  });

  describe('node-rdkafka', () => {
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('KAFKA', 'node-rdkafka', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, nodeRdkafkaConnectionCredentials);
    });
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('KAFKA', 'node-rdkafka', {
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, nodeRdkafkaConnectionCredentials);
    });
    it('Defaul behaviour', () => {
      const binding = bindings.getBinding('KAFKA', 'node-rdkafka');
      assert(binding);
      assert.deepEqual(binding, nodeRdkafkaConnectionCredentials);
    });
    describe('Passing bindng data as parameter.', () => {
      it('Do NOT Remove Unmapped Values', () => {
        const binding = bindings.getBinding('KAFKA', 'node-rdkafka', {
          bindingData,
          removeUnmapped: false
        });
        assert(binding);
        assert.deepEqual(binding, nodeRdkafkaConnectionCredentials);
      });
      it('Remove Unmapped Values', () => {
        const binding = bindings.getBinding('KAFKA', 'node-rdkafka', {
          bindingData,
          removeUnmapped: true
        });
        assert(binding);
        assert.deepEqual(binding, nodeRdkafkaConnectionCredentials);
      });
      it('Defaul behaviour', () => {
        const binding = bindings.getBinding('KAFKA', 'node-rdkafka', {
          bindingData
        });
        assert(binding);
        assert.deepEqual(binding, nodeRdkafkaConnectionCredentials);
      });
    });
  });

  after(() => {
    process.env = env;
  });
});
