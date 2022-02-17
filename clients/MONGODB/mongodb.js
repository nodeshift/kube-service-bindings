// Binding for mongodb client
module.exports = {
  mapping: {
    user: { auth: 'user' },
    password: { auth: 'password' },
    host: 'host',
    port: 'port',
    srv: 'srv',
    type: ''
  },
  transform: (binding) => {
    let userPassword = '';
    if (binding.auth && binding.auth.user) {
      const encodedUser = encodeURIComponent(binding.auth.user);
      let encodedPassword = '';
      if (binding.auth.password) {
        encodedPassword = encodeURIComponent(binding.auth.password);
      }
      userPassword = `${encodedUser}:${encodedPassword}@`;
    }
    if (binding.srv === 'true') {
      binding.url = `mongodb+srv://${userPassword}${binding.host}`;
    } else {
      let port = '';
      if (binding.port) {
        port = `:${binding.port}`;
      }
      binding.url = `mongodb://${userPassword}${binding.host}${port}`;
    }
  }
};
