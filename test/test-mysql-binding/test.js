const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

describe('On MySQL Database', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('fetches credentials for mysql2 client', () => {
    const binding = bindings.getBinding('MYSQL', 'mysql2');
    assert(binding);
    assert.deepEqual(binding, {
      host: 'localhost',
      port: 3306,
      database: 'test',
      user: 'root',
      password: 'password',
      type: 'mysql'
    });
  });

  after(() => {
    process.env = env;
  });
});
