export type QueueName = "video-processing" | "render-export";

export interface VideoProcessingJobData {
  jobId: string;
  videoId: string;
  projectId: string;
  userId: string;
  storageKey: string;
}

export interface RenderClipJobData {
  renderJobId: string;
  clipId: string;
  userId: string;
  aspectRatio: "9:16" | "1:1" | "4:5" | "16:9";
  captionStyleId?: string;
}

export type JobDataMap = {
  "video-processing": VideoProcessingJobData;
  "render-export": RenderClipJobData;
};

export interface IQueueService {
  addJob<K extends QueueName>(
    queueName: K,
    jobName: string,
    data: JobDataMap[K],
    options?: { priority?: number; delay?: number; attempts?: number }
  ): Promise<{ id: string }>;
  
  processJobs<K extends QueueName>(
    queueName: K,
    handler: (data: JobDataMap[K]) => Promise<void>
  ): void;
}
