// Binding for mongodb client
module.exports = {
  mapping: {
    username: { connectionOptions: { auth: 'username' } },
    password: { connectionOptions: { auth: 'password' } },
    host: 'host',
    port: 'port',
    srv: 'srv',
    type: ''
  },
  transform: (binding) => {
    const encodedUser = encodeURIComponent(
      binding.connectionOptions.auth.username
    );

    const encodedPassword = binding.connectionOptions.auth.password
      ? encodeURIComponent(binding.connectionOptions.auth.password)
      : '';

    binding.url = [
      'mongodb',
      binding.srv === 'true' ? '+srv' : '',
      `://${encodedUser}:${encodedPassword}@${binding.host}`,
      binding.srv !== 'true' && binding.port ? `:${binding.port}` : ''
    ].join('');
  }
};
