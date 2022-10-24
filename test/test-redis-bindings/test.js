const assert = require('assert');
const path = require('path');
const { after, before, describe, it } = require('mocha');
const bindings = require('../../index.js');

describe('Redis', () => {
  let env;
  before(() => {
    env = process.env;
    process.env = { SERVICE_BINDING_ROOT: path.join(__dirname, 'bindings') };
  });

  describe('ioredis on redis-bindings', () => {
    it('Default Behaviour', () => {
      const binding = bindings.getBinding('REDIS', 'ioredis');
      assert(binding);
      assert.deepEqual(binding, {
        host: 'thehost',
        password: 'pass1',
        port: '1234',
        username: 'user1'
      });
    });
  });

  describe('ioredis on redis-bindings', () => {
    it('Default Behaviour', () => {
      const binding = bindings.getBinding('REDIS', 'redis');
      assert(binding);
      assert.deepEqual(binding, {
        socket: {
          host: 'thehost',
          port: '1234'
        },
        password: 'pass1',
        username: 'user1'
      });
    });
  });

  after(() => {
    process.env = env;
  });
});
