import { Worker, Job, Queue } from 'bullmq';
import axios from 'axios';
import { redis } from '../utils/cache';
import logger from '../utils/logger';
import aiService from '../services/aiService';
import { db } from '../utils/database';
import { candidateEmbeddings, jobEmbeddings } from '../models/schema';
import { eq, sql } from 'drizzle-orm';

// Define the queue
export const embeddingQueue = new Queue('embedding-queue', {
  connection: redis as any,
});

// Define job payload types
export interface ResumeEmbeddingPayload {
  type: 'resume';
  userId: string;
  sourceText: string;
}

export interface JobEmbeddingPayload {
  type: 'job';
  jobId: string;
  sourceText: string;
}

type EmbeddingPayload = ResumeEmbeddingPayload | JobEmbeddingPayload;

/**
 * Enqueue a background task to generate and store an embedding
 */
export const queueEmbeddingGeneration = async (payload: EmbeddingPayload) => {
  await embeddingQueue.add('generate-embedding', payload, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  });
};

// Initialize the worker
export const embeddingWorker = new Worker<EmbeddingPayload>(
  'embedding-queue',
  async (job: Job<EmbeddingPayload>) => {
    const { type } = job.data;
    
    logger.info(`Processing ${type} embedding generation for job ${job.id}`);

    try {
      // 1. Generate Embedding from NVIDIA NIM
      const nvidiaApiKey = process.env.NVIDIA_API_KEY;
      if (!nvidiaApiKey) {
        throw new Error("NVIDIA_API_KEY is missing from environment");
      }

      const response = await axios.post(
        'https://integrate.api.nvidia.com/v1/embeddings',
        {
          input: [job.data.sourceText],
          model: "nvidia/nv-embedqa-e5-v5",
          input_type: type === 'resume' ? 'passage' : 'query',
          encoding_format: "float",
          truncate: "NONE"
        },
        {
          headers: {
            'Authorization': `Bearer ${nvidiaApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      const embeddingVector = response.data.data[0].embedding;

      // 2. Store in Database
      if (type === 'resume') {
        const { userId } = job.data as ResumeEmbeddingPayload;
        logger.info(`Generated embedding for user ${userId}. Saving to db...`);
        
        await db.insert(candidateEmbeddings)
          .values({
            candidateId: userId,
            modelId: "nvidia/nv-embedqa-e5-v5",
            modelDim: embeddingVector.length,
            embedding: embeddingVector
          })
          .onConflictDoUpdate({
            target: [candidateEmbeddings.candidateId, candidateEmbeddings.modelId],
            set: { embedding: embeddingVector, updatedAt: sql`now()` }
          });
        
      } else if (type === 'job') {
        const { jobId } = job.data as JobEmbeddingPayload;
        logger.info(`Generated embedding for job ${jobId}. Saving to db...`);
        
        await db.insert(jobEmbeddings)
          .values({
            jobId: jobId,
            modelId: "nvidia/nv-embedqa-e5-v5",
            modelDim: embeddingVector.length,
            embedding: embeddingVector
          })
          .onConflictDoUpdate({
            target: [jobEmbeddings.jobId, jobEmbeddings.modelId],
            set: { embedding: embeddingVector, updatedAt: sql`now()` }
          });
      }

    } catch (error) {
      logger.error(`Error processing embedding job ${job.id}:`, error);
      throw error;
    }
  },
  {
    connection: redis as any,
    concurrency: 2, // Process up to 2 embeddings concurrently
  }
);

embeddingWorker.on('completed', (job) => {
  logger.info(`Embedding job ${job.id} completed successfully`);
});

embeddingWorker.on('failed', (job, err) => {
  logger.error(`Embedding job ${job?.id} failed:`, err);
});
