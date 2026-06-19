import { scrapingWorker } from '../workers/scrapingWorker';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

logger.info('🚀 Standalone scraping worker started. Listening for jobs on Redis...');

// Keep process active
setInterval(() => {}, 1000);

process.on('SIGINT', async () => {
  logger.info('Shutting down scraping worker...');
  await scrapingWorker.close();
  process.exit(0);
});
