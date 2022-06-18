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
    const encodedUsername = getEncodedUsername(binding);

    const encodedPassword = getEncodedPassword(binding);

    const usernameAndPassword =
      encodedUsername && encodedPassword
        ? `${encodedUsername}:${encodedPassword}@`
        : '';

    const srv = binding.srv === 'true';

    binding.url = [
      'mongodb',
      srv ? '+srv' : '',
      '://',
      usernameAndPassword,
      `${binding.host}`,
      !srv && binding.port ? `:${binding.port}` : ''
    ].join('');
  }
};

function getEncodedUsername(binding) {
  if (
    binding.connectionOptions &&
    binding.connectionOptions.auth &&
    binding.connectionOptions.auth.username
  ) {
    return encodeURIComponent(binding.connectionOptions.auth.username);
  }
  return '';
}

function getEncodedPassword(binding) {
  if (
    binding.connectionOptions &&
    binding.connectionOptions.auth &&
    binding.connectionOptions.auth.password
  ) {
    return encodeURIComponent(binding.connectionOptions.auth.password);
  }
  return '';
}
