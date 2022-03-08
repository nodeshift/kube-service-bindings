import { KafkaConfig } from 'kafkajs'
import { GlobalConfig } from 'node-rdkafka';
import { ConnectionOptions } from 'pg-connection-string';
import { RedisClientOptions } from 'redis';
import { RedisOptions } from 'ioredis';
import { MongoClientOptions } from 'mongodb';
import { ConnectionOptions as rheaConnectionOptions} from 'rhea';

export function getBinding(service: 'KAFKA', client: 'node-rdkafka'): GlobalConfig;
export function getBinding(service: 'KAFKA', client: 'kafkajs'): KafkaConfig;
export function getBinding(service: 'POSTGRESQL', client: 'pg'): ConnectionOptions;
export function getBinding(service: 'REDIS', client: 'redis'): RedisClientOptions;
export function getBinding(service: 'REDIS', client: 'ioredis'): RedisOptions;
export function getBinding(service: 'MONGODB', client: 'mongodb'): MongoClientOptions;
export function getBinding(service: 'AMQP', client: 'rhea'): rheaConnectionOptions;