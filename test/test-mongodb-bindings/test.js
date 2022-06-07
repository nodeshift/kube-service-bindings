const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

describe('MongoDB', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  describe('mongodb Client', () => {
    it('Default behavior', () => {
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
  });

  describe('mongoose Client', () => {
    it('Default behavior', () => {
      const binding = bindings.getBinding('MONGODB', 'mongoose');
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
  });

  after(() => {
    process.env = env;
  });
});
