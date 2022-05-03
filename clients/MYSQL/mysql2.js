const { filterObject } = require('../../utils/index.js');

const mapping = {
  host: 'host',
  port: 'port',
  username: 'user',
  database: 'database',
  password: 'password'
};

module.exports = {
  mapping,
  filter: (binding) => filterObject(binding, Object.values(mapping))
};
