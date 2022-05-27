const { filterObject } = require('../../utils/index.js');

module.exports = {
  mapping: {
    user: 'user',
    host: 'host',
    database: 'database',
    password: 'password',
    port: 'port',
    'ca.crt': 'sslrootcert',
    'tls.crt': 'sslcert',
    'tls.key': 'sslkey'
  },
  valueFilepath: {
    sslrootcert: true,
    sslcert: true,
    sslkey: true
  },
  transform: (binding) => {

    const pqopt = [
      `{`,
      `sslrootcert=${binding.sslrootcert}`,
      `sslcert=${binding.sslcert}`,
      `sslkey=${binding.sslkey}`,
      `}`
    ].join(' ');

    binding.connectionString = [
      `Pqopt=${pqopt}`,
      `DRIVER=PostgreSQL`,
      `Servername=${binding.host}`,
      `DATABASE=${binding.database}`,
      `Port=${binding.port}`,
      `Username=${binding.user}`,
      `Password=${binding.password}`,
      `SSLmode=verify-ca`
    ].join(';');
  },
  filter: (binding) => {
    return filterObject(binding, ['connectionString']);
  }
};
