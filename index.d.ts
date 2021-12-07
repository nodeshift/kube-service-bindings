import { KafkaConfig } from 'kafkajs'
import { GlobalConfig } from 'node-rdkafka';
import { ConnectionOptions } from 'pg-connection-string';

export function getBinding(service: 'KAFKA', client: 'node-rdkafka'): GlobalConfig;
export function getBinding(service: 'KAFKA', client: 'kafkajs'): KafkaConfig;
export function getBinding(service: 'POSTGRESQL', client: 'pg'): ConnectionOptions;
