const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

describe('test-postgresql-bindings', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('test-postgres-pg', () => {
    const binding = bindings.getBinding('POSTGRESQL', 'pg');
    assert(binding);
    assert.deepEqual(binding, {
      database: 'db1',
      host: '127.0.0.1',
      password: 'p1',
      port: '1234',
      type: 'postgresql',
      user: 'michael',
      ssl: {
        ca: '----BEGIN CERTIFICATE-----\n1234\n-----END CERTIFICATE-----',
        cert: '-----BEGIN CERTIFICATE-----\nABCD\n-----END CERTIFICATE-----',
        key: '-----BEGIN CERTIFICATE-----\nXYZ\n-----END CERTIFICATE-----'
      }
    });
  });

  after(() => {
    process.env = env;
  });
});
