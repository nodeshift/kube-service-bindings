module.exports = {
  bindedFiles: {
    'auto-config.cnf':
      '[mysqld]\ninnodb_buffer_pool_size = 750000000\nmax_connections = 79',
    'ca.crt': '-----BEGIN CERTIFICATE-----\nFGH\n-----END CERTIFICATE-----',
    clustercheck: 'clustercheckpassword',
    clusterIP: 'None',
    database: 'test',
    host: 'localhost',
    monitor: 'monitory',
    operator: 'operatoradmin',
    password: 'password',
    pmmserver: 'admin',
    port: '3306',
    provider: 'percona',
    proxyadmin: 'admin_password',
    replication: 'repl_password',
    root: 'root_password',
    'tls.crt': '-----BEGIN CERTIFICATE-----\nABC\n-----END CERTIFICATE-----',
    'tls.key':
      '-----BEGIN RSA PRIVATE KEY-----\nCDE\n-----END RSA PRIVATE KEY-----',
    type: 'mysql',
    user: 'root',
    xtrabackup: 'backup_password'
  },
  connectionCredentials: {
    host: 'localhost',
    port: 3306,
    database: 'test',
    user: 'root',
    password: 'password'
  },
  connectionString:
    'DRIVER=MySQL;SERVER=localhost;DATABASE=test;PORT=3306;USER=root;PASSWORD=password'
};
