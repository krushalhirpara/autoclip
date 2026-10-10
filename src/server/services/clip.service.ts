import { prisma } from "../db/prisma";
import { JobStatus, RenderStatus } from "@prisma/client";
import { requireClipAccess } from "../auth/guards";
import { SessionUser } from "../auth/auth.config";
import { getQueueService } from "@/core/queue";
import { logger } from "@/lib/logger";

export interface UpdateClipDTO {
  title?: string;
  hook?: string;
  description?: string;
  startTime?: number;
  endTime?: number;
}

export class ClipService {
  static async getClip(clipId: string, user: SessionUser) {
    await requireClipAccess(clipId, user);

    return prisma.clip.findUnique({
      where: { id: clipId },
      include: {
        score: true,
        captions: {
          orderBy: { startTime: "asc" },
        },
        renderJobs: {
          orderBy: { createdAt: "desc" },
        },
        video: true,
        project: true,
      },
    });
  }

  static async updateClip(clipId: string, user: SessionUser, data: UpdateClipDTO) {
    await requireClipAccess(clipId, user);

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.hook !== undefined) updateData.hook = data.hook;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.startTime !== undefined) updateData.startTime = data.startTime;
    if (data.endTime !== undefined) {
      updateData.endTime = data.endTime;
      if (data.startTime !== undefined) {
        updateData.duration = data.endTime - data.startTime;
      }
    }

    return prisma.clip.update({
      where: { id: clipId },
      data: updateData,
      include: {
        score: true,
        captions: true,
        renderJobs: true,
      },
    });
  }

  static async triggerRender(clipId: string, user: SessionUser) {
    const clip = await requireClipAccess(clipId, user);

    // Create a new RenderJob
    const renderJob = await prisma.renderJob.create({
      data: {
        clipId: clip.id,
        status: JobStatus.QUEUED,
        progress: 0,
      },
    });

    // Update clip render status
    await prisma.clip.update({
      where: { id: clip.id },
      data: { renderStatus: RenderStatus.RENDERING },
    });

    // Enqueue background render-export job
    const queueService = getQueueService();
    await queueService.addJob("render-export", `render-clip-${clip.id}-${Date.now()}`, {
      renderJobId: renderJob.id,
      clipId: clip.id,
      userId: user.id,
      aspectRatio: "9:16",
    });

    logger.info(`Render job queued for clip ${clip.id}`, "ClipService");
    return renderJob;
  }
}
