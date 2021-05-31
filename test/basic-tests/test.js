const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

describe('basic tests', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('unknown service', () => {
    try {
      bindings.getBinding('DOEST_NOT_EXIST');
      assert.fail();
    } catch (err) {
      assert.equal(err.toString(), 'Error: Unknown service type');
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
