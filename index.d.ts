import { KafkaConfig } from 'kafkajs'

export function getBinding(service: 'KAFKA', client: 'node-rdkafka'): unknown;
export function getBinding(service: 'KAFKA', client: 'kafkajs'): KafkaConfig;
