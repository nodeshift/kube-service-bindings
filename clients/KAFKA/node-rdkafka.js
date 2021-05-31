// Binding for node-rdkafka client
module.exports = {
  mapping: {
    securityProtocol: 'security.protocol',
    bootstrapServers: 'bootstrap.servers',
    clientId: 'client.id',
    saslMechanism: 'sasl.mechanisms',
    type: '',
    provider: '',
    clientSecret: '',
    user: 'sasl.username',
    password: 'sasl.password'
  }
};
