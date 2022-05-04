const { filterObject } = require('../../utils/index.js');

module.exports = {
  mapping: {
    user: 'user',
    host: 'host',
    database: 'database',
    password: 'password',
    port: 'port',
    'ca.crt': { ssl: 'ca' },
    'tls.key': { ssl: 'key' },
    'tls.crt': { ssl: 'cert' }
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
        `DRIVER=PostgreSQL`,
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
