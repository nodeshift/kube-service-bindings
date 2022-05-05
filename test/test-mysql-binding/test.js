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

  it('fetches Unmapped credentials for mysql2 client', () => {
    const binding = bindings.getBinding('MYSQL', 'mysql2', {
      removeUnmapped: false
    });
    assert(binding);
    assert.deepEqual(binding, {
      clusterIP: 'None',
      clustercheck: 'clustercheckpassword',
      monitor: 'monitory',
      operator: 'operatoradmin',
      pmmserver: 'admin',
      provider: 'percona',
      proxyadmin: 'admin_password',
      replication: 'repl_password',
      root: 'root_password',
      xtrabackup: 'backup_password',
      host: 'localhost',
      port: 3306,
      database: 'test',
      user: 'root',
      password: 'password',
      type: 'mysql'
    });
  });

  it('fetches credentials for mysql2 client filtered by mappings', () => {
    const binding = bindings.getBinding('MYSQL', 'mysql2', {
      removeUnmapped: true
    });
    assert(binding);
    assert.deepEqual(binding, {
      host: 'localhost',
      port: 3306,
      database: 'test',
      user: 'root',
      password: 'password'
    });
  });

  after(() => {
    process.env = env;
  });
});
