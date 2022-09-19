const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

const {
  bindedFiles,
  connectionCredentials,
  connectionString
} = require('./assertions');

describe('MySQL', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  describe('mysql2', () => {
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, bindedFiles);
    });

    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2', {
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, connectionCredentials);
    });

    it('Default behaviour.', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2');
      assert(binding);
      assert.deepEqual(binding, connectionCredentials);
    });
  });
  describe('mysql', () => {
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql', {
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, connectionCredentials);
    });

    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, { ...bindedFiles, ...connectionCredentials });
    });

    it('Default behaviour', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql');
      assert(binding);
      assert.deepEqual(binding, connectionCredentials);
    });
  });
  describe('ODBC Client for MySQL', () => {
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'odbc', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, {
        ...bindedFiles,
        connectionString
      });
    });
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'odbc', {
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, {
        connectionString
      });
    });

    it('Default behaviour', () => {
      const binding = bindings.getBinding('MYSQL', 'odbc');
      assert(binding);
      assert.deepEqual(binding, {
        connectionString
      });
    });
  });
  describe('Binding data as parameter.', () => {
    describe('mysql2', () => {
      it('Do NOT Remove Unmapped Values', () => {
        const binding = bindings.getBinding('MYSQL', 'mysql2', {
          removeUnmapped: false,
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, bindedFiles);
      });

      it('Remove Unmapped Values', () => {
        const binding = bindings.getBinding('MYSQL', 'mysql2', {
          removeUnmapped: true,
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, connectionCredentials);
      });

      it('Default behaviour.', () => {
        const binding = bindings.getBinding('MYSQL', 'mysql2', {
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, connectionCredentials);
      });
    });
    describe('mysql', () => {
      it('Remove Unmapped Values', () => {
        const binding = bindings.getBinding('MYSQL', 'mysql', {
          removeUnmapped: true,
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, connectionCredentials);
      });

      it('Do NOT Remove Unmapped Values', () => {
        const binding = bindings.getBinding('MYSQL', 'mysql', {
          removeUnmapped: false,
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, { ...bindedFiles, ...connectionCredentials });
      });

      it('Default behaviour', () => {
        const binding = bindings.getBinding('MYSQL', 'mysql', {
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, connectionCredentials);
      });
    });
    describe('ODBC Client for MySQL', () => {
      it('Do NOT Remove Unmapped Values', () => {
        const binding = bindings.getBinding('MYSQL', 'odbc', {
          removeUnmapped: false,
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, {
          ...bindedFiles,
          connectionString
        });
      });
      it('Remove Unmapped Values', () => {
        const binding = bindings.getBinding('MYSQL', 'odbc', {
          removeUnmapped: true,
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, {
          connectionString
        });
      });

      it('Default behaviour', () => {
        const binding = bindings.getBinding('MYSQL', 'odbc', {
          bindingData: bindedFiles
        });
        assert(binding);
        assert.deepEqual(binding, {
          connectionString
        });
      });
    });
  });
  after(() => {
    process.env = env;
  });
});
