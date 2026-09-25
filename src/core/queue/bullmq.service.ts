import { Queue, Worker, Job } from "bullmq";
import Redis from "ioredis";
import { IQueueService, JobDataMap, QueueName } from "./queue.interface";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export class BullMQService implements IQueueService {
  private redisConnection: Redis;
  private queues = new Map<string, Queue>();
  private workers = new Map<string, Worker>();

  constructor() {
    this.redisConnection = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });
  }

  private getQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      const q = new Queue(name, {
        connection: this.redisConnection,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 2000,
          },
          removeOnComplete: 100,
          removeOnFail: 500,
        },
      });
      this.queues.set(name, q);
    }
    return this.queues.get(name)!;
  }

  async addJob<K extends QueueName>(
    queueName: K,
    jobName: string,
    data: JobDataMap[K],
    options?: { priority?: number; delay?: number; attempts?: number }
  ): Promise<{ id: string }> {
    const queue = this.getQueue(queueName);
    const job = await queue.add(jobName, data, {
      priority: options?.priority,
      delay: options?.delay,
      attempts: options?.attempts,
    });

    logger.info(`[BullMQ] Added job ${jobName} (${job.id}) to ${queueName}`, "BullMQ");
    return { id: job.id || `job-${Date.now()}` };
  }

  processJobs<K extends QueueName>(
    queueName: K,
    handler: (data: JobDataMap[K]) => Promise<void>
  ): void {
    if (this.workers.has(queueName)) {
      return;
    }

    const worker = new Worker(
      queueName,
      async (job: Job) => {
        logger.info(`[BullMQ Worker] Processing ${job.name} (${job.id})`, "BullMQ");
        await handler(job.data as JobDataMap[K]);
      },
      {
        connection: this.redisConnection,
        concurrency: 2,
      }
    );

    worker.on("completed", (job) => {
      logger.info(`[BullMQ Worker] Finished job ${job.id}`, "BullMQ");
    });

    worker.on("failed", (job, err) => {
      logger.error(`[BullMQ Worker] Failed job ${job?.id}: ${err.message}`, "BullMQ", err);
    });

    this.workers.set(queueName, worker);
  }
}
