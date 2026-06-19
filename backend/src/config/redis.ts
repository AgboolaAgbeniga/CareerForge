import Redis from 'ioredis';
import { env } from './env';
import logger from '../utils/logger';

// Initialize the Upstash Redis client
const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null, // Required by BullMQ
  enableReadyCheck: false,
});

redis.on('connect', () => {
  logger.info('✅ Successfully connected to Redis');
});

redis.on('error', (err) => {
  logger.error('❌ Redis connection error:', err);
});

export default redis;
