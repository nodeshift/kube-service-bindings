const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const fs = require('fs');
const bindings = require('../../index.js');

const { bindedFiles, connectionString } = require('./assertionObjects');

describe('test-postgresql-bindings', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  it('Testing pg client with id and removeUnmapped option', () => {
    const binding = bindings.getBinding('POSTGRESQL', 'pg', {
      id: 'postgresql-bindings',
      removeUnmapped: true
    });
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

  it('Testing pg client with id and removeUnmapped option to false', () => {
    const binding = bindings.getBinding('POSTGRESQL', 'pg', {
      id: 'postgresql-bindings',
      removeUnmapped: false
    });
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

  it('Testing pg client with id and mapped option default behaviour', () => {
    const binding = bindings.getBinding('POSTGRESQL', 'pg', {
      id: 'postgresql-bindings'
    });
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

  it('fetches Unmapped credentials for odbc client in PSQL', () => {
    const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
      removeUnmapped: false
    });

    const sslrootcert = `${process.env.SERVICE_BINDING_ROOT}/crunchy-data-postgres-operator/ca.crt`;
    const sslcert = `${process.env.SERVICE_BINDING_ROOT}/crunchy-data-postgres-operator/tls.crt`;
    const sslkey = `tls.key`;

    const pqopt = [
      `{`,
      `sslrootcert=${sslrootcert}`,
      `sslcert=${sslcert}`,
      `sslkey=${sslkey}`,
      `}`
    ].join(' ');

    const validationObject = {
      ...bindedFiles,
      sslrootcert,
      sslcert,
      sslkey,
      connectionString: `Pqopt=${pqopt};${connectionString}`
    };
    assert(binding);
    assert.deepEqual(binding, validationObject);
  });

  it('fetches credentials for odbc client in PSQL filtered by mappings', () => {
    const binding = bindings.getBinding('POSTGRESQL', 'odbc', {
      removeUnmapped: true
    });

    const sslrootcert = `${process.env.SERVICE_BINDING_ROOT}/crunchy-data-postgres-operator/ca.crt`;
    const sslcert = `${process.env.SERVICE_BINDING_ROOT}/crunchy-data-postgres-operator/tls.crt`;
    const sslkey = `tls.key`;

    const pqopt = [
      `{`,
      `sslrootcert=${sslrootcert}`,
      `sslcert=${sslcert}`,
      `sslkey=${sslkey}`,
      `}`
    ].join(' ');

    const validationObject = {
      connectionString: `Pqopt=${pqopt};${connectionString}`
    };

    assert(binding);
    assert.deepEqual(binding, validationObject);
  });

  it('fetches credentials for odbc client in PSQL default behaviour', () => {
    const binding = bindings.getBinding('POSTGRESQL', 'odbc');

    const sslrootcert = `${process.env.SERVICE_BINDING_ROOT}/crunchy-data-postgres-operator/ca.crt`;
    const sslcert = `${process.env.SERVICE_BINDING_ROOT}/crunchy-data-postgres-operator/tls.crt`;
    const sslkey = `tls.key`;

    const pqopt = [
      `{`,
      `sslrootcert=${sslrootcert}`,
      `sslcert=${sslcert}`,
      `sslkey=${sslkey}`,
      `}`
    ].join(' ');

    const validationObject = {
      connectionString: `Pqopt=${pqopt};${connectionString}`
    };

    assert(binding);
    assert.deepEqual(binding, validationObject);
    after(function () {
      fs.unlink(sslkey, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });

  after(() => {
    process.env = env;
  });
});
