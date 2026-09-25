import { IStorageService } from "./storage.interface";
import { LocalStorageService } from "./local-storage.service";
import { S3StorageService } from "./s3-storage.service";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

let storageInstance: IStorageService | null = null;

export function getStorageService(): IStorageService {
  if (storageInstance) {
    return storageInstance;
  }

  if (env.STORAGE_PROVIDER === "s3" && env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY) {
    logger.info("Initializing S3StorageService (AWS S3 / Cloudflare R2)", "StorageFactory");
    storageInstance = new S3StorageService();
  } else {
    logger.info("Initializing LocalStorageService for local filesystem media storage", "StorageFactory");
    storageInstance = new LocalStorageService();
  }

  return storageInstance;
}

export * from "./storage.interface";
