const { filterObject } = require('../../utils/index.js');
const { mapping } = require('./mysql.js');
module.exports = {
  mapping,
  transform: (binding) => {
    binding.connectionString = [
      'DRIVER=MySQL',
      `SERVER=${binding.host}`,
      `DATABASE=${binding.database}`,
      `PORT=${binding.port}`,
      `USER=${binding.user}`,
      `PASSWORD=${binding.password}`
    ].join(';');
  },
  filter: (binding) => {
    return filterObject(binding, ['connectionString']);
  }
};
