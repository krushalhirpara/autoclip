import { IVideoProcessor } from "./video.interface";
import { FFmpegVideoProcessor, MockVideoProcessor } from "./ffmpeg-processor.service";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

let videoProcessorInstance: IVideoProcessor | null = null;

export function getVideoProcessor(): IVideoProcessor {
  if (videoProcessorInstance) {
    return videoProcessorInstance;
  }

  if (env.VIDEO_PROCESSOR === "ffmpeg") {
    logger.info("Initializing FFmpegVideoProcessor", "VideoProcessorFactory");
    videoProcessorInstance = new FFmpegVideoProcessor(env.FFMPEG_PATH, env.FFPROBE_PATH);
  } else {
    logger.info("Initializing MockVideoProcessor for rapid local testing", "VideoProcessorFactory");
    videoProcessorInstance = new MockVideoProcessor();
  }

  return videoProcessorInstance;
}

export * from "./video.interface";
