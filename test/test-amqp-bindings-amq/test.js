const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

describe('On AMQ message broker', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('fetches credentials for rhea', () => {
    const binding = bindings.getBinding('AMQP', 'rhea');
    assert(binding);
    assert.deepEqual(binding, {
      host: 'test.domain.com',
      password: 'pass1',
      port: 1234,
      provider: 'amqp',
      type: 'amqp',
      username: 'user1'
    });
  });

  after(() => {
    process.env = env;
  });
});
