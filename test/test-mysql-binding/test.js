const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

const {
  bindedFiles,
  connectionCredentials,
  connectionString
} = require('./assertions');

describe('On MySQL Database', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('fetches Unmapped credentials for mysql2 client', () => {
    const binding = bindings.getBinding('MYSQL', 'mysql2', {
      removeUnmapped: false
    });
    assert(binding);
    assert.deepEqual(binding, bindedFiles);
  });

  it('fetches credentials for mysql2 client filtered by mappings', () => {
    const binding = bindings.getBinding('MYSQL', 'mysql2', {
      removeUnmapped: true
    });
    assert(binding);
    assert.deepEqual(binding, connectionCredentials);
  });

  it('fetches Unmapped credentials for mysql client', () => {
    const binding = bindings.getBinding('MYSQL', 'mysql', {
      removeUnmapped: false
    });
    assert(binding);
    assert.deepEqual(binding, bindedFiles);
  });

  it('fetches credentials for mysql client filtered by mappings', () => {
    const binding = bindings.getBinding('MYSQL', 'mysql', {
      removeUnmapped: true
    });
    assert(binding);
    assert.deepEqual(binding, connectionCredentials);
  });

  it('ODBC Client for MySQL fetching credentials NOT filtered by mappings', () => {
    const binding = bindings.getBinding('MYSQL', 'odbc', {
      removeUnmapped: false
    });
    assert(binding);
    assert.deepEqual(binding, {
      ...bindedFiles,
      connectionString
    });
  });

  it('ODBC Client for Mysql, fetching credentials filtered by mappings', () => {
    const binding = bindings.getBinding('MYSQL', 'odbc', {
      removeUnmapped: true
    });
    assert(binding);
    assert.deepEqual(binding, {
      connectionString
    });
  });

  after(() => {
    process.env = env;
  });
});
