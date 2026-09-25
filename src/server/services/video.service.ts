import { prisma } from "../db/prisma";
import { JobStatus, JobType, VideoStatus } from "@prisma/client";
import { requireVideoAccess } from "../auth/guards";
import { SessionUser } from "../auth/auth.config";
import { getQueueService } from "@/core/queue";
import { logger } from "@/lib/logger";

export interface RegisterVideoDTO {
  projectId: string;
  userId: string;
  title: string;
  originalFilename?: string;
  storageKey: string;
  storageUrl: string;
  fileSize?: bigint;
}

export class VideoService {
  static async registerVideo(data: RegisterVideoDTO) {
    const video = await prisma.video.create({
      data: {
        projectId: data.projectId,
        userId: data.userId,
        title: data.title,
        originalFilename: data.originalFilename,
        storageKey: data.storageKey,
        storageUrl: data.storageUrl,
        fileSize: data.fileSize,
        status: VideoStatus.PROCESSING,
      },
    });

    // Create initial processing job
    const job = await prisma.processingJob.create({
      data: {
        videoId: video.id,
        projectId: data.projectId,
        type: JobType.TRANSCRIBE,
        status: JobStatus.QUEUED,
        progress: 0,
      },
    });

    // Dispatch to background queue
    const queueService = getQueueService();
    await queueService.addJob("video-processing", `process-video-${video.id}`, {
      jobId: job.id,
      videoId: video.id,
      projectId: data.projectId,
      userId: data.userId,
      storageKey: data.storageKey,
    });

    logger.info(`Video registered and queued for AI analysis: ${video.id}`, "VideoService");
    return { video, job };
  }

  static async getVideoDetails(videoId: string, user: SessionUser) {
    await requireVideoAccess(videoId, user);

    return prisma.video.findUnique({
      where: { id: videoId },
      include: {
        transcripts: {
          include: {
            segments: {
              orderBy: { startTime: "asc" },
            },
            speakers: true,
          },
        },
        clips: {
          orderBy: { createdAt: "desc" },
          include: {
            score: true,
            captions: true,
            renderJobs: true,
          },
        },
        processingJobs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }
}
