import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IStorageService, PresignedUrlOptions, UploadResult } from "./storage.interface";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export class S3StorageService implements IStorageService {
  private client: S3Client;
  private bucket: string;
  private publicBaseUrl?: string;

  constructor() {
    this.bucket = env.S3_BUCKET_NAME;
    this.publicBaseUrl = env.S3_PUBLIC_BASE_URL;

    this.client = new S3Client({
      region: env.S3_REGION,
      endpoint: env.S3_ENDPOINT || undefined,
      credentials:
        env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY
          ? {
              accessKeyId: env.S3_ACCESS_KEY_ID,
              secretAccessKey: env.S3_SECRET_ACCESS_KEY,
            }
          : undefined,
      forcePathStyle: !!env.S3_ENDPOINT, // Required for Cloudflare R2 or MinIO
    });
  }

  async uploadFile(buffer: Buffer, key: string, contentType: string): Promise<UploadResult> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await this.client.send(command);
    logger.info(`Uploaded file to S3: ${key}`, "S3Storage");

    return {
      key,
      url: this.getPublicUrl(key),
      size: buffer.length,
      contentType,
    };
  }

  async downloadFile(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const response = await this.client.send(command);
    const byteArray = await response.Body?.transformToByteArray();
    if (!byteArray) {
      throw new Error(`Empty response body when downloading ${key}`);
    }
    return Buffer.from(byteArray);
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    await this.client.send(command);
    logger.info(`Deleted file from S3: ${key}`, "S3Storage");
  }

  async getPresignedUploadUrl(options: PresignedUrlOptions): Promise<{ uploadUrl: string; key: string }> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: options.key,
      ContentType: options.contentType,
    });

    const uploadUrl = await getSignedUrl(this.client, command, {
      expiresIn: options.expiresInSeconds || 3600,
    });

    return {
      uploadUrl,
      key: options.key,
    };
  }

  getPublicUrl(key: string): string {
    if (this.publicBaseUrl) {
      return `${this.publicBaseUrl.replace(/\/$/, "")}/${key}`;
    }
    if (env.S3_ENDPOINT) {
      return `${env.S3_ENDPOINT.replace(/\/$/, "")}/${this.bucket}/${key}`;
    }
    return `https://${this.bucket}.s3.${env.S3_REGION}.amazonaws.com/${key}`;
  }

  async fileExists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      await this.client.send(command);
      return true;
    } catch {
      return false;
    }
  }
}
