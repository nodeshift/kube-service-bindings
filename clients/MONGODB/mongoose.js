const { mapping, transform } = require('./mongodb.js');
const { filterObject } = require('../../utils');

// Binding for mongoose client
module.exports = {
  mapping,
  transform,
  filter: (binding) => filterObject(binding, ['url', 'connectionOptions'])
};
