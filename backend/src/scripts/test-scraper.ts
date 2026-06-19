import { queueScrapingJob } from '../workers/scrapingWorker';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const testUrls = [
  // A standard YC startup job posting or Greenhouse URL works well
  "https://boards.greenhouse.io/canonical/jobs/5202868003"
];

async function main() {
  logger.info('Adding test jobs to scraping queue...');
  
  for (const url of testUrls) {
    await queueScrapingJob({
      url,
      source: 'test-script'
    });
    logger.info(`Queued: ${url}`);
  }

  logger.info('Finished queueing. Keep the worker running to process.');
  process.exit(0);
}

main().catch(console.error);
