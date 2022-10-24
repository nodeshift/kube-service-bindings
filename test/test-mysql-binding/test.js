const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

const {
  bindingData,
  bindingDataMappedForMysql2,
  bindingDataMappedForMysql,
  connectionString
} = require('./assertions');

describe('MySQL', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  describe('mysql2 on mysql-bindings', () => {
    it('Default behaviour.', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2');
      assert(binding);
      assert.deepEqual(binding, bindingDataMappedForMysql2);
    });
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, bindingData);
    });

    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2', {
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, bindingDataMappedForMysql2);
    });
  });

  describe('mysql2 Passing binding data as arguments', () => {
    it('Default behaviour.', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2', {
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, bindingDataMappedForMysql2);
    });
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2', {
        removeUnmapped: false,
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, bindingData);
    });

    it('Removes Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql2', {
        removeUnmapped: true,
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, bindingDataMappedForMysql2);
    });
  });
  describe('mysql on mysql-bindings', () => {
    it('Default behaviour', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql');
      assert(binding);
      assert.deepEqual(binding, bindingDataMappedForMysql);
    });
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql', {
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, bindingDataMappedForMysql);
    });

    it('Does NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, {
        ...bindingData,
        ...bindingDataMappedForMysql
      });
    });
  });

  describe('mysql passing binding data as arguments', () => {
    it('Default behaviour', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql', {
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, bindingDataMappedForMysql);
    });
    it('Removes Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql', {
        removeUnmapped: true,
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, bindingDataMappedForMysql);
    });

    it('Does NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'mysql', {
        removeUnmapped: false,
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, {
        ...bindingData,
        ...bindingDataMappedForMysql
      });
    });
  });

  describe('ODBC Client on mysql-bindings', () => {
    it('Default behaviour', () => {
      const binding = bindings.getBinding('MYSQL', 'odbc');
      assert(binding);
      assert.deepEqual(binding, {
        connectionString
      });
    });
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'odbc', {
        removeUnmapped: false
      });
      assert(binding);
      assert.deepEqual(binding, {
        ...bindingData,
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
  });

  describe('ODBC Client passing binding data as arguments', () => {
    it('Default behaviour', () => {
      const binding = bindings.getBinding('MYSQL', 'odbc', {
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, {
        connectionString
      });
    });
    it('Do NOT Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'odbc', {
        removeUnmapped: false,
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, {
        ...bindingData,
        connectionString
      });
    });
    it('Remove Unmapped Values', () => {
      const binding = bindings.getBinding('MYSQL', 'odbc', {
        removeUnmapped: true,
        bindingData
      });
      assert(binding);
      assert.deepEqual(binding, {
        connectionString
      });
    });
  });

  after(() => {
    process.env = env;
  });
});
