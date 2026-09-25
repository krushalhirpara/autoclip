import fs from "fs/promises";
import path from "path";
import { IStorageService, PresignedUrlOptions, UploadResult } from "./storage.interface";
import { logger } from "@/lib/logger";

export class LocalStorageService implements IStorageService {
  private baseDir: string;
  private baseUrl: string;

  constructor(baseDir = "uploads", baseUrl = "/api/v1/storage/file") {
    this.baseDir = path.join(/*turbopackIgnore: true*/ process.cwd(), baseDir);
    this.baseUrl = baseUrl;
    this.ensureDirectory();
  }

  private async ensureDirectory() {
    try {
      await fs.mkdir(this.baseDir, { recursive: true });
    } catch (error) {
      logger.error("Failed to create local uploads directory", "LocalStorage", error);
    }
  }

  private getFilePath(key: string): string {
    const safeKey = key.replace(/\.\./g, "");
    return path.join(this.baseDir, safeKey);
  }

  async uploadFile(buffer: Buffer, key: string, contentType: string): Promise<UploadResult> {
    await this.ensureDirectory();
    const filePath = this.getFilePath(key);
    const parentDir = path.dirname(filePath);
    await fs.mkdir(parentDir, { recursive: true });
    await fs.writeFile(filePath, buffer);

    logger.debug(`File uploaded locally: ${key} (${buffer.length} bytes)`, "LocalStorage");

    return {
      key,
      url: this.getPublicUrl(key),
      size: buffer.length,
      contentType,
    };
  }

  async downloadFile(key: string): Promise<Buffer> {
    const filePath = this.getFilePath(key);
    return await fs.readFile(filePath);
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const filePath = this.getFilePath(key);
      await fs.unlink(filePath);
      logger.debug(`File deleted locally: ${key}`, "LocalStorage");
    } catch (error) {
      logger.warn(`Could not delete file locally: ${key}`, "LocalStorage", error);
    }
  }

  async getPresignedUploadUrl(options: PresignedUrlOptions): Promise<{ uploadUrl: string; key: string }> {
    // In local mode, upload endpoint handles the file directly
    return {
      uploadUrl: `/api/v1/storage/upload?key=${encodeURIComponent(options.key)}`,
      key: options.key,
    };
  }

  getPublicUrl(key: string): string {
    return `${this.baseUrl}?key=${encodeURIComponent(key)}`;
  }

  async fileExists(key: string): Promise<boolean> {
    try {
      const filePath = this.getFilePath(key);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
