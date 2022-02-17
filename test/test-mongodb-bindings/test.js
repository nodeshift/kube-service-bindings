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
      srv: 'true',
      url: 'mongodb+srv://michael:p1@test.ourdomain.com'
    });
  });

  after(() => {
    process.env = env;
  });
});
