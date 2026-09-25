export interface UploadResult {
  key: string;
  url: string;
  size: number;
  contentType: string;
}

export interface PresignedUrlOptions {
  key: string;
  contentType: string;
  expiresInSeconds?: number;
}

export interface IStorageService {
  uploadFile(buffer: Buffer, key: string, contentType: string): Promise<UploadResult>;
  downloadFile(key: string): Promise<Buffer>;
  deleteFile(key: string): Promise<void>;
  getPresignedUploadUrl(options: PresignedUrlOptions): Promise<{ uploadUrl: string; key: string }>;
  getPublicUrl(key: string): string;
  fileExists(key: string): Promise<boolean>;
}
