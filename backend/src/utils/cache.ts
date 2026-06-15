import Redis from 'ioredis';
import { env } from '../config/env';
import logger from './logger';

export const redis = new Redis((env as any).REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

redis.on('connect', () => {
  logger.info('Connected to Redis successfully');
});

/**
 * Cache utility for storing and retrieving JSON data
 */
export const cache = {
  /**
   * Get parsed JSON from cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      logger.error(`Cache GET error for key ${key}:`, error);
      return null;
    }
  },

  /**
   * Set JSON data in cache with optional TTL
   * @param ttl Time to live in seconds
   */
  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    try {
      const data = JSON.stringify(value);
      if (ttl) {
        await redis.set(key, data, 'EX', ttl);
      } else {
        await redis.set(key, data);
      }
      return true;
    } catch (error) {
      logger.error(`Cache SET error for key ${key}:`, error);
      return false;
    }
  },

  /**
   * Delete a key from cache
   */
  async del(key: string): Promise<boolean> {
    try {
      await redis.del(key);
      return true;
    } catch (error) {
      logger.error(`Cache DEL error for key ${key}:`, error);
      return false;
    }
  },
};
