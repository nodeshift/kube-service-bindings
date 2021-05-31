// Binding for kafkajs client
module.exports = {
  mapping: {
    securityProtocol: 'ssl',
    bootstrapServers: ['brokers'],
    clientId: 'clientId',
    saslMechanism: { sasl: 'mechanism' },
    type: '',
    provider: '',
    clientSecret: '',
    user: { sasl: 'username' },
    password: { sasl: 'password' }
  },
  valueMapping: { ssl: { SASL_SSL: true } },
  transform: (binding) => {
    if (binding.sasl && binding.sasl.mechanism) {
      binding.sasl.mechanism = binding.sasl.mechanism.toLowerCase();
    }
  }
};
