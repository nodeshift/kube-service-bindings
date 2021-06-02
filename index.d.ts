import { KafkaConfig } from 'kafkajs'
import { GlobalConfig } from 'node-rdkafka';

export function getBinding(service: 'KAFKA', client: 'node-rdkafka'): GlobalConfig;
export function getBinding(service: 'KAFKA', client: 'kafkajs'): KafkaConfig;
