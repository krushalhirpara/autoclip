export interface VideoMetadata {
  duration: number; // seconds
  width: number;
  height: number;
  fps: number;
  format: string;
  bitrate?: number;
  audioCodec?: string;
  videoCodec?: string;
}

export interface ReframeOptions {
  aspectRatio: "9:16" | "1:1" | "4:5" | "16:9";
  targetWidth: number;
  targetHeight: number;
  focalPoint?: { x: number; y: number }; // normalized 0.0 - 1.0
}

export interface RenderClipOptions {
  inputVideoPath: string;
  outputVideoPath: string;
  startTime: number;
  endTime: number;
  reframe: ReframeOptions;
  subtitlesAssPath?: string;
  watermarkPath?: string;
}

export interface IVideoProcessor {
  probeMetadata(videoPath: string): Promise<VideoMetadata>;
  extractAudio(videoPath: string, outputAudioPath: string): Promise<string>;
  generateThumbnail(videoPath: string, timestampSeconds: number, outputPath: string): Promise<string>;
  renderClip(options: RenderClipOptions, onProgress?: (percent: number) => void): Promise<string>;
}
