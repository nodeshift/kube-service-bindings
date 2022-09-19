const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

const bindingData = {
  host: 'test.domain.com',
  password: 'pass1',
  port: '1234',
  provider: 'amqp',
  type: 'amqp',
  username: 'user1'
};

const connectionCredentials = {
  host: 'test.domain.com',
  password: 'pass1',
  port: '1234',
  provider: 'amqp',
  type: 'amqp',
  username: 'user1'
};

describe('AMQ', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  describe('rhea', () => {
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, connectionCredentials);
    });
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', {
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, connectionCredentials);
    });
    it('Default behaviour', () => {
      const binding = bindings.getBinding('AMQP', 'rhea');
      assert(binding);
      assert.deepEqual(binding, connectionCredentials);
    });
  });
  describe('Passing bindng data as parameter.', () => {
    describe('rhea', () => {
      it('Do NOT Remove Unmapped Values', () => {
        const binding = bindings.getBinding('AMQP', 'rhea', {
          bindingData,
          removeUnmapped: false
        });
        assert(binding);
        assert.deepEqual(binding, connectionCredentials);
      });
      it('Remove Unmapped Values', () => {
        const binding = bindings.getBinding('AMQP', 'rhea', {
          bindingData,
          removeUnmapped: true
        });
        assert(binding);
        assert.deepEqual(binding, connectionCredentials);
      });
      it('Default behaviour', () => {
        const binding = bindings.getBinding('AMQP', 'rhea', { bindingData });
        assert(binding);
        assert.deepEqual(binding, connectionCredentials);
      });
    });
  });
  after(() => {
    process.env = env;
  });
});
