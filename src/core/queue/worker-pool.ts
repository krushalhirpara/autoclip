import { getQueueService } from "./index";
import { getStorageService } from "../storage";
import { getAIService } from "../ai";
import { getVideoProcessor } from "../video";
import { prisma } from "@/server/db/prisma";
import { JobStatus, RenderStatus } from "@prisma/client";
import { logger } from "@/lib/logger";
import path from "path";
import os from "os";

export function registerBackgroundWorkers() {
  const queueService = getQueueService();
  const storageService = getStorageService();
  const aiService = getAIService();
  const videoProcessor = getVideoProcessor();

  // -------------------------------------------------------------
  // Worker: Video Processing & AI Moment Detection Pipeline
  // -------------------------------------------------------------
  queueService.processJobs("video-processing", async (data) => {
    const { jobId, videoId, projectId, storageKey } = data;
    logger.info(`Starting video analysis pipeline for video ${videoId}`, "WorkerPool");

    const tempDir = os.tmpdir();
    const tempVideoPath = path.join(tempDir, `video-${videoId}.mp4`);
    const tempAudioPath = path.join(tempDir, `audio-${videoId}.mp3`);

    try {
      // 1. Update job to PROCESSING
      await prisma.processingJob.update({
        where: { id: jobId },
        data: { status: JobStatus.PROCESSING, progress: 10, startedAt: new Date() },
      });

      // 2. Download or fetch video buffer
      const videoBuffer = await storageService.downloadFile(storageKey);
      const fs = await import("fs/promises");
      await fs.writeFile(tempVideoPath, videoBuffer);

      // 3. Extract video metadata
      const metadata = await videoProcessor.probeMetadata(tempVideoPath);
      await prisma.video.update({
        where: { id: videoId },
        data: {
          duration: metadata.duration,
          width: metadata.width,
          height: metadata.height,
          fps: metadata.fps,
          format: metadata.format,
        },
      });

      await prisma.processingJob.update({
        where: { id: jobId },
        data: { progress: 30 },
      });

      // 4. Extract audio
      await videoProcessor.extractAudio(tempVideoPath, tempAudioPath);
      const audioBuffer = await fs.readFile(tempAudioPath);

      // 5. AI Transcription & Speaker Diarization
      const transcription = await aiService.transcription.transcribeAudio(audioBuffer, `audio-${videoId}.mp3`);

      const transcriptRecord = await prisma.transcript.create({
        data: {
          videoId,
          language: transcription.language,
          rawText: transcription.rawText,
          status: "COMPLETED",
          speakers: {
            create: transcription.speakers.map((s) => ({
              label: s.label,
              name: s.name,
              speakerIndex: s.speakerIndex,
            })),
          },
        },
        include: { speakers: true },
      });

      // Map speakers
      const speakerMap = new Map<string, string>();
      for (const spk of transcriptRecord.speakers) {
        speakerMap.set(spk.label, spk.id);
      }

      // Create transcript segments
      for (let i = 0; i < transcription.segments.length; i++) {
        const seg = transcription.segments[i];
        await prisma.transcriptSegment.create({
          data: {
            transcriptId: transcriptRecord.id,
            startTime: seg.startTime,
            endTime: seg.endTime,
            text: seg.text,
            speakerId: seg.speakerLabel ? speakerMap.get(seg.speakerLabel) : undefined,
            orderIndex: i,
            words: JSON.parse(JSON.stringify(seg.words)),
          },
        });
      }

      await prisma.processingJob.update({
        where: { id: jobId },
        data: { progress: 65 },
      });

      // 6. AI High-Potential Moment Detection & Multi-factor Scoring
      const detectedMoments = await aiService.clipDetector.detectMoments(transcription);

      for (const moment of detectedMoments) {
        // Create Clip
        const clip = await prisma.clip.create({
          data: {
            videoId,
            projectId,
            startTime: moment.startTime,
            endTime: moment.endTime,
            duration: moment.duration,
            title: moment.title,
            hook: moment.hook,
            description: moment.description,
            hashtags: moment.hashtags,
            status: "READY",
            renderStatus: RenderStatus.NOT_STARTED,
          },
        });

        // Store multi-factor score breakdown
        await prisma.clipScore.create({
          data: {
            clipId: clip.id,
            overallScore: moment.score.overallScore,
            hookStrength: moment.score.hookStrength,
            engagementPotential: moment.score.engagementPotential,
            clarity: moment.score.clarity,
            emotionalImpact: moment.score.emotionalImpact,
            storyCompleteness: moment.score.storyCompleteness,
            reasoning: moment.score.reasoning,
          },
        });

        // Extract words belonging to this clip time window for animated captions
        const clipWords = transcription.segments
          .filter((s) => s.startTime >= moment.startTime && s.endTime <= moment.endTime)
          .flatMap((s) => s.words);

        if (clipWords.length > 0) {
          const captionChunks = await aiService.captions.generateCaptions(clipWords);
          for (const cap of captionChunks) {
            await prisma.caption.create({
              data: {
                clipId: clip.id,
                startTime: cap.startTime,
                endTime: cap.endTime,
                text: cap.text,
                wordsJson: JSON.parse(JSON.stringify(cap.wordsJson)),
              },
            });
          }
        }
      }

      // 7. Mark Video & ProcessingJob COMPLETED
      await prisma.video.update({
        where: { id: videoId },
        data: { status: "READY" },
      });

      await prisma.processingJob.update({
        where: { id: jobId },
        data: {
          status: JobStatus.COMPLETED,
          progress: 100,
          completedAt: new Date(),
        },
      });

      logger.info(`Video pipeline successfully completed for video ${videoId}. Generated ${detectedMoments.length} clips.`, "WorkerPool");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error in processing pipeline";
      logger.error(`Video pipeline failed for video ${videoId}`, "WorkerPool", error);

      await prisma.processingJob.update({
        where: { id: jobId },
        data: {
          status: JobStatus.FAILED,
          error: errorMessage,
        },
      });

      await prisma.video.update({
        where: { id: videoId },
        data: { status: "FAILED" },
      });
    } finally {
      // Clean up temp files
      try {
        const fs = await import("fs/promises");
        await fs.unlink(tempVideoPath).catch(() => {});
        await fs.unlink(tempAudioPath).catch(() => {});
      } catch {}
    }
  });

  // -------------------------------------------------------------
  // Worker: Vertical Reframe & Video Render Worker
  // -------------------------------------------------------------
  queueService.processJobs("render-export", async (data) => {
    const { renderJobId, clipId } = data;
    logger.info(`Starting render job ${renderJobId} for clip ${clipId}`, "WorkerPool");

    try {
      await prisma.renderJob.update({
        where: { id: renderJobId },
        data: { status: JobStatus.PROCESSING, progress: 20, startedAt: new Date() },
      });

      // Fetch clip and video details
      const clip = await prisma.clip.findUnique({
        where: { id: clipId },
        include: { video: true },
      });

      if (!clip) {
        throw new Error(`Clip ${clipId} not found`);
      }

      const tempDir = os.tmpdir();
      const tempOutputPath = path.join(tempDir, `rendered-${clipId}.mp4`);

      // Execute render
      await videoProcessor.renderClip({
        inputVideoPath: clip.video.storageUrl,
        outputVideoPath: tempOutputPath,
        startTime: clip.startTime,
        endTime: clip.endTime,
        reframe: {
          aspectRatio: "9:16",
          targetWidth: 1080,
          targetHeight: 1920,
        },
      });

      // Upload rendered video
      const fs = await import("fs/promises");
      const renderedBuffer = await fs.readFile(tempOutputPath);
      const storageKey = `exports/${clip.projectId}/${clipId}.mp4`;
      const uploadResult = await storageService.uploadFile(renderedBuffer, storageKey, "video/mp4");

      await prisma.renderJob.update({
        where: { id: renderJobId },
        data: {
          status: JobStatus.COMPLETED,
          progress: 100,
          outputStorageKey: uploadResult.key,
          outputUrl: uploadResult.url,
          completedAt: new Date(),
        },
      });

      await prisma.clip.update({
        where: { id: clipId },
        data: { renderStatus: RenderStatus.COMPLETED },
      });

      logger.info(`Render job completed for clip ${clipId}`, "WorkerPool");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Render failed";
      logger.error(`Render job failed for clip ${clipId}`, "WorkerPool", error);

      await prisma.renderJob.update({
        where: { id: renderJobId },
        data: { status: JobStatus.FAILED, error: msg },
      });

      await prisma.clip.update({
        where: { id: clipId },
        data: { renderStatus: RenderStatus.FAILED },
      });
    }
  });
}
