const { filterObject } = require('../../utils/index.js');

module.exports = {
  mapping: {
    host: 'host',
    database: 'database',
    port: 'port',
    username: 'user',
    password: 'password'
  },
  transform: (binding) => {
    if (
      binding.host &&
      binding.database &&
      binding.port &&
      binding.user &&
      binding.password
    ) {
      binding.connectionString = [
        `DRIVER=MySQL`,
        `SERVER=${binding.host}`,
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
