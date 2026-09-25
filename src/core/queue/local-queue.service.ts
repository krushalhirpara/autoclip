import { IQueueService, JobDataMap, QueueName } from "./queue.interface";
import { logger } from "@/lib/logger";

export class LocalQueueService implements IQueueService {
  private handlers = new Map<string, (data: unknown) => Promise<void>>();

  async addJob<K extends QueueName>(
    queueName: K,
    jobName: string,
    data: JobDataMap[K],
    options?: { priority?: number; delay?: number; attempts?: number }
  ): Promise<{ id: string }> {
    const id = `local-job-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    logger.info(`[LocalQueue] Enqueued job: ${jobName} on queue '${queueName}' (id: ${id})`, "LocalQueue");

    const handler = this.handlers.get(queueName);
    if (handler) {
      // Execute asynchronously in background microtask to simulate background queue worker
      setTimeout(async () => {
        try {
          logger.info(`[LocalQueue] Executing job: ${jobName} (${id})`, "LocalQueue");
          await handler(data);
          logger.info(`[LocalQueue] Completed job: ${jobName} (${id})`, "LocalQueue");
        } catch (error) {
          logger.error(`[LocalQueue] Failed job: ${jobName} (${id})`, "LocalQueue", error);
        }
      }, options?.delay || 100);
    } else {
      logger.warn(`[LocalQueue] No worker registered for queue '${queueName}' yet. Job ${id} queued.`, "LocalQueue");
    }

    return { id };
  }

  processJobs<K extends QueueName>(
    queueName: K,
    handler: (data: JobDataMap[K]) => Promise<void>
  ): void {
    logger.info(`[LocalQueue] Worker registered for queue: '${queueName}'`, "LocalQueue");
    this.handlers.set(queueName, handler as (data: unknown) => Promise<void>);
  }
}
