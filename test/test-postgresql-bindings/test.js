const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const fs = require('fs');
const bindings = require('../../index.js');

const {
  crunchyDataBindingsMappedForPG,
  crunchyDataBindingsMappedForOdbc,
  getPqopt,
  getSslcerts,
  getOdbcConnectionString
} = require('./mappedDataBindings');

const regex = /sslkey=[^}]*/i;

describe('PSQL', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });
  describe('PG client on crunchy-data-postgres-operator', () => {
    const id = 'crunchy-data-postgres-operator';
    it('Default behavior: removes unnecessary properties.', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'pg', {
        id
      });
      assert(binding);
      assert.deepEqual(binding, crunchyDataBindingsMappedForPG);
    });

    it('Removes unnecessary properties', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'pg', {
        id,
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, crunchyDataBindingsMappedForPG);
    });

    it('Does not remove unnecessary properties', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'pg', {
        id,
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, crunchyDataBindingsMappedForPG);
    });
  });
  describe('ODBC client on crunchy-data-postgres-operator', () => {
    const id = 'crunchy-data-postgres-operator';

    it('Default behavior: removes unnecessary properties. Does NOT copy tls.key in another directory with proper permissions.', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
        id
      });

      const pqopt = getPqopt({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT
      });

      const odbcConnectionString = getOdbcConnectionString(pqopt);

      assert(binding);
      assert.deepEqual(binding, odbcConnectionString);
    });

    it('Removes unnecessary properties and copies tls.key file in another location with altered/proper permissions.', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
        id,
        removeUnmapped: true,
        allowCopy: true
      });

      const sslkey = binding.connectionString
        .match(regex)[0]
        .split('=')[1]
        .trim();

      const pqopt = getPqopt({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT,
        overrideSslkeyPath: sslkey
      });

      const odbcConnectionString = getOdbcConnectionString(pqopt);

      assert(binding);
      assert.deepEqual(binding, odbcConnectionString);
      after(function () {
        return removeDirectory(sslkey);
      });
    });

    it('Removes unnecessary properties and does NOT copy tls.key file in another directory.', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
        id,
        removeUnmapped: true,
        allowCopy: false
      });

      const pqopt = getPqopt({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT
      });

      const odbcConnectionString = getOdbcConnectionString(pqopt);

      assert(binding);
      assert.deepEqual(binding, odbcConnectionString);
    });

    it('Does NOT remove unnecessary properties and copies tls.key file in another directory with altered/proper permissions.', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
        id,
        removeUnmapped: false,
        allowCopy: true
      });

      const sslkey = binding.connectionString
        .match(regex)[0]
        .split('=')[1]
        .trim();

      const { sslrootcert, sslcert } = getSslcerts({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT
      });

      const pqopt = getPqopt({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT,
        overrideSslkeyPath: sslkey
      });

      const odbcConnectionString = getOdbcConnectionString(pqopt);

      const validationObject = {
        ...crunchyDataBindingsMappedForOdbc,
        sslrootcert,
        sslcert,
        sslkey,
        ...odbcConnectionString
      };
      assert(binding);
      assert.deepEqual(binding, validationObject);
      after(function () {
        return removeDirectory(sslkey);
      });
    });

    it('Does NOT remove unnecessary properties and does NOT copy tls.key file in another directory with altered/proper permissions.', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
        id,
        removeUnmapped: false,
        allowCopy: false
      });

      const { sslrootcert, sslcert, sslkey } = getSslcerts({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT
      });

      const pqopt = getPqopt({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT
      });

      const odbcConnectionString = getOdbcConnectionString(pqopt);

      const validationObject = {
        ...crunchyDataBindingsMappedForOdbc,
        sslrootcert,
        sslcert,
        sslkey,
        ...odbcConnectionString
      };

      assert(binding);
      assert.deepEqual(binding, validationObject);
    });

    it('Removes unnecessary properties and copies tls.key file in another directory with altered/proper permissions.', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
        id,
        allowCopy: true
      });

      const sslkey = binding.connectionString
        .match(regex)[0]
        .split('=')[1]
        .trim();

      const pqopt = getPqopt({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT,
        overrideSslkeyPath: sslkey
      });

      const odbcConnectionString = getOdbcConnectionString(pqopt);

      assert(binding);
      assert.deepEqual(binding, odbcConnectionString);
      after(function () {
        return removeDirectory(sslkey);
      });
    });

    it('Removes unnecessary properties and does NOT copy tls.key file in another directory.', () => {
      const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
        id,
        allowCopy: false
      });

      const pqopt = getPqopt({
        serviceBindingRoot: process.env.SERVICE_BINDING_ROOT
      });

      const odbcConnectionString = getOdbcConnectionString(pqopt);

      assert(binding);
      assert.deepEqual(binding, odbcConnectionString);
    });
  });
  after(() => {
    process.env = env;
  });
});

function removeDirectory(sslkey) {
  fs.rmdir(path.dirname(sslkey), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
