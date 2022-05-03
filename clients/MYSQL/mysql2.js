const { filterObject } = require('../../utils/index.js');

module.exports = {
  mapping: {
    host: 'host',
    port: 'port',
    username: 'user',
    database: 'database',
    password: 'password'
  },
  filter: (binding) => filterObject(binding, Object.values(this.mapping))
};
