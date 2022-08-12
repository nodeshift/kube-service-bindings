const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

const {
  errors: { NO_SERVICE_BINDING_ROOT, INVALID_ARGUMENTS }
} = require('../../utils/messages/index.js');

describe('basic tests', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('Should return raw bindings data.', () => {
    const binding = bindings.getBinding();
    assert(binding);
    assert.deepEqual(binding, [
      {
        bootstrapServers: 'test-boostrap:443',
        clientId: 'client1',
        clientSecret: 'pass1',
        password: 'pass1',
        provider: 'rhoas',
        saslMechanism: 'PLAIN',
        securityProtocol: 'SASL_SSL',
        type: 'kafka',
        user: 'user1'
      },
      {
        bootstrapServers: 'another-test-boostrap:443',
        clientId: 'another-client1',
        clientSecret: 'another-pass1',
        password: 'another-pass1',
        provider: 'another-rhoas',
        saslMechanism: 'another-PLAIN',
        securityProtocol: 'another-SASL_SSL',
        type: 'another-kafka',
        user: 'another-user1'
      }
    ]);
  });

  it('unknown service', () => {
    try {
      bindings.getBinding('DOEST_NOT_EXIST');
      assert.fail();
    } catch (err) {
      assert.equal(err.toString(), 'Error: Unknown service type');
    }
  });

  const ERROR_INVALID_ARGUMENTS = `Error: ${INVALID_ARGUMENTS}`;

  it(`should throw error: ${ERROR_INVALID_ARGUMENTS}`, () => {
    try {
      bindings.getBinding('KAFKA', { removeUnmapped: true });
      assert.fail();
    } catch (err) {
      assert.equal(err.toString(), ERROR_INVALID_ARGUMENTS);
    }
  });

  it('unknown client', () => {
    try {
      bindings.getBinding('KAFKA', 'does-not-exist');
      assert.fail();
    } catch (err) {
      assert.equal(err.toString(), 'Error: Unknown client');
    }
  });

  it('no client', () => {
    const binding = bindings.getBinding('KAFKA');
    assert(binding);
    assert.deepEqual(binding, {
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
  });

  it('id matches available', () => {
    const binding = bindings.getBinding('KAFKA', 'kafkajs', 'kafka');
    assert(binding);
  });

  it('id filters available', () => {
    try {
      bindings.getBinding('KAFKA', 'kafkajs', 'does_not_exist');
      assert.fail();
    } catch (err) {
      assert.equal(err.toString(), 'Error: No Binding Found');
    }
  });

  after(() => {
    process.env = env;
  });
});

describe('basic tests 2', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings2') };
  });

  it('no available binding', () => {
    try {
      bindings.getBinding('KAFKA');
      assert.fail();
    } catch (err) {
      assert.equal(err.toString(), 'Error: No Binding Found');
    }
  });

  after(() => {
    process.env = env;
  });
});

describe('No service binding variable provided on process environment.', () => {
  const ERROR_NO_SERVICE_BINDING_ROOT = `Error: ${NO_SERVICE_BINDING_ROOT}`;
  it(`should throw error: ${NO_SERVICE_BINDING_ROOT}`, () => {
    try {
      bindings.getBinding('KAFKA');
    } catch (err) {
      assert.equal(err.toString(), ERROR_NO_SERVICE_BINDING_ROOT);
    }
  });

  it(`Should throw error: ${NO_SERVICE_BINDING_ROOT}`, () => {
    try {
      bindings.getBinding();
      assert.fail();
    } catch (err) {
      assert.equal(err.toString(), ERROR_NO_SERVICE_BINDING_ROOT);
    }
  });
});
