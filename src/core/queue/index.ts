import { IQueueService } from "./queue.interface";
import { LocalQueueService } from "./local-queue.service";
import { BullMQService } from "./bullmq.service";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

let queueServiceInstance: IQueueService | null = null;

export function getQueueService(): IQueueService {
  if (queueServiceInstance) {
    return queueServiceInstance;
  }

  if (env.QUEUE_DRIVER === "bullmq") {
    logger.info("Initializing BullMQ Queue Service with Redis", "QueueFactory");
    queueServiceInstance = new BullMQService();
  } else {
    logger.info("Initializing LocalQueueService for development without Redis", "QueueFactory");
    queueServiceInstance = new LocalQueueService();
  }

  return queueServiceInstance;
}

export * from "./queue.interface";
