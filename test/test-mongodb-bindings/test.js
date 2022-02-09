const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

describe('test-mongodb-bindings', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('test-mongodb', () => {
    const binding = bindings.getBinding('MONGODB', 'mongodb');
    assert(binding);
    assert.deepEqual(binding, {
      host: 'test.ourdomain.com',
      password: 'p1',
      port: '1234',
      type: 'mongodb',
      user: 'michael',
      srv: 'true'
    });
  });

  after(() => {
    process.env = env;
  });
});
