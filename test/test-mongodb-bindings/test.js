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

  describe('mongodb on mongodb-bindings', () => {
    const id = 'mongodb-bindings';
    it('Default behaviour', () => {
      const binding = bindings.getBinding('MONGODB', 'mongodb', {
        id
      });
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

  describe('mongodb on mongodb-bindings-without-username-password', () => {
    const id = 'mongodb-bindings-without-username-password';
    it('Default behaviour', () => {
      const binding = bindings.getBinding('MONGODB', 'mongodb', {
        id
      });
      assert(binding);
      assert.deepEqual(binding, {
        host: 'test.ourdomain.com',
        port: '1234',
        srv: 'true',
        url: 'mongodb+srv://test.ourdomain.com'
      });
    });
  });

  describe('mongodb on mongodb-bindings-with-port', () => {
    const id = 'mongodb-bindings-with-port';
    it('Default behaviour', () => {
      const binding = bindings.getBinding('MONGODB', 'mongodb', {
        id
      });
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
        url: 'mongodb://michael:p1@test.ourdomain.com:1234'
      });
    });
  });

  describe('mongodb on passing binding data as arguments', () => {
    const bindingData = {
      host: 'test.ourdomain.com',
      password: 'p1',
      port: 1234,
      username: 'michael'
    };

    it('Default behaviour', () => {
      const binding = bindings.getBinding('MONGODB', 'mongodb', {
        bindingData
      });
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
        url: 'mongodb://michael:p1@test.ourdomain.com:1234'
      });
    });
  });

  describe('mongoose on mongodb-bindings ', () => {
    const id = 'mongodb-bindings';
    it('Default behavior', () => {
      const binding = bindings.getBinding('MONGODB', 'mongoose', {
        id
      });
      assert(binding);
      assert.deepEqual(binding, {
        connectionOptions: {
          auth: {
            password: 'p1',
            username: 'michael'
          }
        },
        url: 'mongodb+srv://michael:p1@test.ourdomain.com'
      });
    });

    it('Remove unmapped values', () => {
      const binding = bindings.getBinding('MONGODB', 'mongoose', {
        removeUnmapped: true,
        id
      });
      assert(binding);
      assert.deepEqual(binding, {
        connectionOptions: {
          auth: {
            password: 'p1',
            username: 'michael'
          }
        },
        url: 'mongodb+srv://michael:p1@test.ourdomain.com'
      });
    });

    it('Do NOT Remove unmapped values', () => {
      const binding = bindings.getBinding('MONGODB', 'mongoose', {
        removeUnmapped: false,
        id
      });
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

  describe('mongoose on mongodb-bindings-with-port', () => {
    const id = 'mongodb-bindings-with-port';
    it('Default Behaviour', () => {
      const binding = bindings.getBinding('MONGODB', 'mongoose', {
        id
      });
      assert(binding);
      assert.deepEqual(binding, {
        connectionOptions: {
          auth: {
            password: 'p1',
            username: 'michael'
          }
        },
        url: 'mongodb://michael:p1@test.ourdomain.com:1234'
      });
    });

    it('Remove unmapped values', () => {
      const binding = bindings.getBinding('MONGODB', 'mongoose', {
        id,
        removeUnmapped: true
      });
      assert(binding);
      assert.deepEqual(binding, {
        connectionOptions: {
          auth: {
            password: 'p1',
            username: 'michael'
          }
        },
        url: 'mongodb://michael:p1@test.ourdomain.com:1234'
      });
    });

    it('Do NOT Remove unmapped values', () => {
      const binding = bindings.getBinding('MONGODB', 'mongoose', {
        id,
        removeUnmapped: false
      });
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
        url: 'mongodb://michael:p1@test.ourdomain.com:1234'
      });
    });
  });

  after(() => {
    process.env = env;
  });
});
