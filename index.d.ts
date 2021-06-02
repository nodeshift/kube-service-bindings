import { KafkaConfig } from 'kafkajs'

declare module 'kube-service-bindings' {
  export function getBinding(service: 'KAFKA', client: 'node-rdkafka'): unknown;
  export function getBinding(service: 'KAFKA', client: 'kafkajs'): KafkaConfig;
}
