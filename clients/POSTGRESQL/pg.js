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
  },
  transform: (binding) => {
    if (binding.options) {
      binding.options = buildOptionParam(binding.options);
    }
  }
};

// Returns a concatenated list of options parameters defined in the bound file `options` in the format specified in
// PostgreSQL Doc:
//   https://www.postgresql.org/docs/14/libpq-connect.html
//   e.g.: -c opt=val
//
// CockroachDB Cloud, which shares the same `postgresql://` protocol as PostgreSQL, has a customized option for its
// multi-tenant hosts: `--cluster=<host_name>`
// Reference:
//   https://www.cockroachlabs.com/docs/v21.2/connection-parameters#additional-connection-parameters
//
function buildOptionParam(bindOpt) {
  // expected raw options format: key1=val1&key2=val2...
  const optList = [];
  bindOpt
    .split('&')
    .map((item) => item.split('='))
    .filter(([key, value]) => {
      return key && value;
    })
    .forEach(function ([key, value]) {
      if (key === '--cluster') {
        optList.unshift(`${key}=${value}`);
      } else {
        optList.push(`-c ${key}=${value}`);
      }
    });
  return optList.join(' ');
}
