import { Worker, Job, Queue } from 'bullmq';
import axios from 'axios';
import { redis } from '../utils/cache';
import logger from '../utils/logger';
import { db } from '../utils/database';
import { jobs, recruiters, companies } from '../models/schema';
import { eq } from 'drizzle-orm';
import { queueEmbeddingGeneration } from './embeddingWorker';

// Define the queue
export const scrapingQueue = new Queue('scraping-queue', {
  connection: redis as any,
});

export interface ScrapingPayload {
  url: string;
  source: string; // e.g., 'linkedin', 'greenhouse', 'jobberman'
  companyName?: string;
  recruiterId?: string; // If initiated by a specific recruiter
}

export const queueScrapingJob = async (payload: ScrapingPayload) => {
  await scrapingQueue.add('scrape-job', payload, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 10000,
    },
  });
};

export const scrapingWorker = new Worker<ScrapingPayload>(
  'scraping-queue',
  async (job: Job<ScrapingPayload>) => {
    const { url, source, companyName, recruiterId } = job.data;
    logger.info(`Processing scraping job ${job.id} for URL: ${url}`);

    try {
      // 1. Call Python Scraper API
      const pythonApiUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
      const response = await axios.post(`${pythonApiUrl}/scraper/job`, {
        url
      });

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to extract job data');
      }

      const extracted = response.data.data;
      logger.info(`Extracted job data: ${extracted.title} at ${extracted.company_name}`);

      // 2. Resolve or Create Company
      let companyId: string | null = null;
      const targetCompanyName = companyName || extracted.company_name;
      
      if (targetCompanyName) {
        const [existingCompany] = await db.select().from(companies).where(eq(companies.name, targetCompanyName)).limit(1);
        if (existingCompany) {
          companyId = existingCompany.id;
        } else {
          const [newCompany] = await db.insert(companies).values({
            name: targetCompanyName,
            industry: 'Unknown',
          }).returning();
          companyId = newCompany!.id;
        }
      }

      // 3. Save to Database
      const [newJob] = await db.insert(jobs).values({
        title: extracted.title,
        companyId: companyId,
        recruiterId: recruiterId || null,
        description: extracted.description,
        requirements: extracted.requirements || null,
        location: extracted.location,
        jobType: extracted.employment_type?.toLowerCase().includes('part') ? 'part_time' : 
                 extracted.employment_type?.toLowerCase().includes('contract') ? 'contract' : 'full_time',
        status: 'open',
      }).returning();

      logger.info(`Saved scraped job as ID: ${newJob!.id}`);

      // 4. Queue for embedding generation
      const sourceText = `${extracted.title}\n${extracted.company_name}\n${extracted.description}\n${extracted.requirements || ''}`;
      await queueEmbeddingGeneration({
        type: 'job',
        jobId: newJob!.id,
        sourceText
      });

    } catch (error: any) {
      logger.error(`Error processing scraping job ${job.id}:`, error?.message || error);
      throw error;
    }
  },
  {
    connection: redis as any,
    concurrency: 5, // Process up to 5 parallel scrapes
    limiter: {
      max: 10,
      duration: 1000 * 60, // 10 jobs per minute limit to avoid aggressive bans
    }
  }
);

scrapingWorker.on('completed', (job) => {
  logger.info(`Scraping job ${job.id} completed successfully`);
});

scrapingWorker.on('failed', (job, err) => {
  logger.error(`Scraping job ${job?.id} failed:`, err);
});
