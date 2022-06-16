const { filterObject } = require('../../utils/index.js');

module.exports = {
  mapping: {
    user: 'user',
    host: 'host',
    database: 'database',
    password: 'password',
    port: 'port',
    'ca.crt': { key: 'sslrootcert', path: true },
    'tls.crt': { key: 'sslcert', path: true },
    'tls.key': { key: 'sslkey', path: true, copy: true }
  },
  transform: (binding) => {
    const pqopt = [
      '{',
      `sslrootcert=${binding.sslrootcert}`,
      `sslcert=${binding.sslcert}`,
      `sslkey=${binding.sslkey}`,
      '}'
    ].join(' ');

    binding.connectionString = [
      `Pqopt=${pqopt}`,
      'DRIVER=PostgreSQL',
      `Servername=${binding.host}`,
      `DATABASE=${binding.database}`,
      `Port=${binding.port}`,
      `Username=${binding.user}`,
      `Password=${binding.password}`,
      'SSLmode=verify-full'
    ].join(';');
  },
  filter: (binding) => filterObject(binding, ['connectionString'])
};
