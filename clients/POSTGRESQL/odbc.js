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
      binding.user &&
      binding.host &&
      binding.database &&
      binding.password &&
      binding.port
    ) {
      binding.connectionString = [
        `DRIVER=PostgreSQL`,
        `USER=${binding.user}`,
        `SERVER=${binding.host}`,
        `DATABASE=${binding.database}`,
        `PASSWORD=${binding.password}`,
        `PORT:${binding.port}`
      ].join(';');
    }
  }
};
