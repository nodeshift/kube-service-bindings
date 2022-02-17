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
      connectionOptions: {
        auth: {
          password: 'p1',
          username: 'michael'
        }
      },
      host: 'test.ourdomain.com',
      port: '1234',
      url: 'mongodb://michael:p1@test.ourdomain.com:1234'
    });
  });

  after(() => {
    process.env = env;
  });
});
