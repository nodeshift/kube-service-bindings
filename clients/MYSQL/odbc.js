const { filterObject } = require('../../utils/index.js');

module.exports = {
  mapping: {
    host: 'server',
    database: 'database',
    port: 'port',
    username: 'user',
    password: 'password'
  },
  transform: (binding) => {
    if (
      binding.server &&
      binding.database &&
      binding.port &&
      binding.user &&
      binding.password
    ) {
      binding.connectionString = [
        `DRIVER=MySQL`,
        `SERVER=${binding.server}`,
        `DATABASE=${binding.database}`,
        `PORT:${binding.port}`,
        `USER=${binding.user}`,
        `PASSWORD=${binding.password}`
      ].join(';');
    }
  },
  filter: (binding) => {
    return filterObject(binding, ['connectionString']);
  }
};
