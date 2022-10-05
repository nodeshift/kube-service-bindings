const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

const amqBindingData = {
  host: 'test.domain.com',
  password: 'pass1',
  port: '1234',
  provider: 'amqp',
  type: 'amqp',
  username: 'user1'
};

const rabbitmqBindingsMappedForRhea = {
  host: 'test.domain.com',
  password: 'pass1',
  port: 1234,
  provider: 'rabbitmq',
  type: 'rabbitmq',
  username: 'user1'
};

const amqBindingsMappedForRhea = {
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

  describe('rhea on amqp-bindings', () => {
    const id = 'amqp-bindings';
    it('Default behaviour', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', { id });
      assert(binding);
      assert.deepEqual(binding, amqBindingsMappedForRhea);
    });
    it('Does NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', {
        removeUnmapped: false,
        id
      });
      assert(binding);
      assert.deepEqual(binding, amqBindingsMappedForRhea);
    });
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', {
        removeUnmapped: true,
        id
      });
      assert(binding);
      assert.deepEqual(binding, amqBindingsMappedForRhea);
    });
  });
  describe('rhea on rabbitmq-bindings', () => {
    const id = 'rabbitmq-bindings';
    it('Default behaviour', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', { id });
      assert(binding);
      assert.deepEqual(binding, rabbitmqBindingsMappedForRhea);
    });
    it('Does NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', {
        removeUnmapped: false,
        id
      });
      assert(binding);
      assert.deepEqual(binding, rabbitmqBindingsMappedForRhea);
    });
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', {
        removeUnmapped: true,
        id
      });
      assert(binding);
      assert.deepEqual(binding, rabbitmqBindingsMappedForRhea);
    });
  });
  describe('rhea passing amq bindng data as parameter.', () => {
    it('Default behaviour', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', { bindingData: amqBindingData });
      assert(binding);
      assert.deepEqual(binding, amqBindingsMappedForRhea);
    });
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', {
        bindingData: amqBindingData,
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, amqBindingsMappedForRhea);
    });
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('AMQP', 'rhea', {
        bindingData: amqBindingData,
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, amqBindingsMappedForRhea);
    });
  });
  after(() => {
    process.env = env;
  });
});
