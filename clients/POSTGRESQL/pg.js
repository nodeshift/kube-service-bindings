// Binding for pg client
module.exports = {
  mapping: {
    username: 'user',
    host: 'host',
    database: 'database',
    password: 'password',
    port: 'port',
    'root.crt': { ssl: 'ca' },
    'tls.key': { ssl: 'key' },
    'tls.crt': { ssl: 'cert' }
  }
};
