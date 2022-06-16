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

    const srv = binding.srv === 'true';

    binding.url = [
      'mongodb',
      srv ? '+srv' : '',
      `://${encodedUser}:${encodedPassword}@${binding.host}`,
      !srv && binding.port ? `:${binding.port}` : ''
    ].join('');
  }
};
