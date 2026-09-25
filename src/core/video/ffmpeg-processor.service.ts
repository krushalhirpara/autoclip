import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import { IVideoProcessor, RenderClipOptions, VideoMetadata } from "./video.interface";
import { logger } from "@/lib/logger";

const execAsync = promisify(exec);

export class MockVideoProcessor implements IVideoProcessor {
  async probeMetadata(videoPath: string): Promise<VideoMetadata> {
    logger.info(`[MOCK] Probing metadata for: ${videoPath}`, "MockVideoProcessor");
    return {
      duration: 184.5,
      width: 1920,
      height: 1080,
      fps: 30,
      format: "mp4",
      bitrate: 4500000,
      videoCodec: "h264",
      audioCodec: "aac",
    };
  }

  async extractAudio(videoPath: string, outputAudioPath: string): Promise<string> {
    logger.info(`[MOCK] Extracting audio: ${videoPath} -> ${outputAudioPath}`, "MockVideoProcessor");
    // Create dummy audio buffer if file doesn't exist
    try {
      await fs.writeFile(outputAudioPath, Buffer.from("DUMMY_AUDIO_STREAM"));
    } catch (e) {
      logger.debug("Could not write mock audio file (ignored in memory mode)", "MockVideoProcessor", e);
    }
    return outputAudioPath;
  }

  async generateThumbnail(videoPath: string, timestampSeconds: number, outputPath: string): Promise<string> {
    logger.info(`[MOCK] Generating thumbnail at ${timestampSeconds}s for ${videoPath}`, "MockVideoProcessor");
    return outputPath;
  }

  async renderClip(options: RenderClipOptions, onProgress?: (percent: number) => void): Promise<string> {
    logger.info(`[MOCK] Rendering clip from ${options.startTime}s to ${options.endTime}s`, "MockVideoProcessor");

    if (onProgress) {
      onProgress(25);
      onProgress(50);
      onProgress(75);
      onProgress(100);
    }

    try {
      await fs.writeFile(options.outputVideoPath, Buffer.from("DUMMY_RENDERED_CLIP"));
    } catch (e) {
      logger.debug("Could not write mock rendered clip file", "MockVideoProcessor", e);
    }

    return options.outputVideoPath;
  }
}

export class FFmpegVideoProcessor implements IVideoProcessor {
  private ffmpegPath: string;
  private ffprobePath: string;

  constructor(ffmpegPath = "ffmpeg", ffprobePath = "ffprobe") {
    this.ffmpegPath = ffmpegPath;
    this.ffprobePath = ffprobePath;
  }

  async probeMetadata(videoPath: string): Promise<VideoMetadata> {
    try {
      const command = `"${this.ffprobePath}" -v quiet -print_format json -show_format -show_streams "${videoPath}"`;
      const { stdout } = await execAsync(command);
      const data = JSON.parse(stdout);

      const videoStream = data.streams?.find((s: { codec_type: string }) => s.codec_type === "video");
      const audioStream = data.streams?.find((s: { codec_type: string }) => s.codec_type === "audio");

      let fps = 30;
      if (videoStream?.r_frame_rate) {
        const [num, den] = videoStream.r_frame_rate.split("/").map(Number);
        if (den && den > 0) fps = Math.round(num / den);
      }

      return {
        duration: parseFloat(data.format?.duration || "0"),
        width: videoStream?.width || 1920,
        height: videoStream?.height || 1080,
        fps,
        format: data.format?.format_name || "mp4",
        bitrate: parseInt(data.format?.bit_rate || "0", 10),
        videoCodec: videoStream?.codec_name,
        audioCodec: audioStream?.codec_name,
      };
    } catch (error) {
      logger.error(`Failed to probe video metadata with ffprobe for ${videoPath}`, "FFmpegVideoProcessor", error);
      throw error;
    }
  }

  async extractAudio(videoPath: string, outputAudioPath: string): Promise<string> {
    try {
      const command = `"${this.ffmpegPath}" -y -i "${videoPath}" -vn -acodec libmp3lame -q:a 2 "${outputAudioPath}"`;
      await execAsync(command);
      logger.info(`Extracted audio successfully to ${outputAudioPath}`, "FFmpegVideoProcessor");
      return outputAudioPath;
    } catch (error) {
      logger.error(`Audio extraction failed for ${videoPath}`, "FFmpegVideoProcessor", error);
      throw error;
    }
  }

  async generateThumbnail(videoPath: string, timestampSeconds: number, outputPath: string): Promise<string> {
    try {
      const command = `"${this.ffmpegPath}" -y -ss ${timestampSeconds} -i "${videoPath}" -vframes 1 -q:v 2 "${outputPath}"`;
      await execAsync(command);
      return outputPath;
    } catch (error) {
      logger.error(`Thumbnail generation failed for ${videoPath}`, "FFmpegVideoProcessor", error);
      throw error;
    }
  }

  async renderClip(options: RenderClipOptions, onProgress?: (percent: number) => void): Promise<string> {
    try {
      const duration = options.endTime - options.startTime;
      // High-performance vertical reframe filter (9:16 crop & scale)
      const cropFilter = "crop=ih*(9/16):ih,scale=1080:1920";

      let filterComplex = cropFilter;
      if (options.subtitlesAssPath) {
        filterComplex += `,ass='${options.subtitlesAssPath.replace(/\\/g, "/")}'`;
      }

      const command = `"${this.ffmpegPath}" -y -ss ${options.startTime} -i "${options.inputVideoPath}" -t ${duration} -vf "${filterComplex}" -c:v libx264 -preset veryfast -crf 22 -c:a aac -b:a 192k "${options.outputVideoPath}"`;

      logger.info(`Executing FFmpeg render: ${command}`, "FFmpegVideoProcessor");
      if (onProgress) onProgress(20);

      await execAsync(command);

      if (onProgress) onProgress(100);
      return options.outputVideoPath;
    } catch (error) {
      logger.error("FFmpeg clip render failed", "FFmpegVideoProcessor", error);
      throw error;
    }
  }
}
