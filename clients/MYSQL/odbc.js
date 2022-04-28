module.exports = {
  mapping: {
    host: 'host',
    port: 'port',
    username: 'UID',
    database: 'database',
    password: 'PWD',
    type: 'DSN'
  },
  transform: (binding) => {
    console.log('got called');
    if (
      binding.host &&
      binding.port &&
      binding.UID &&
      binding.database &&
      binding.PWD
    ) {
      console.log('im in');
      binding.connectionString = [
        `Driver=MySQL`,
        `Uid=${binding.UID}`,
        `Pwd=${binding.PWD}`,
        `Database=${binding.database}`,
        `Server=${binding.host}`,
        `Port:${binding.port}`
      ].join(';');
    }
  }
};
