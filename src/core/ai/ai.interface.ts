export interface TranscriptWord {
  word: string;
  start: number;
  end: number;
  score?: number;
}

export interface TranscriptSegmentData {
  startTime: number;
  endTime: number;
  text: string;
  speakerId?: string;
  speakerLabel?: string;
  words: TranscriptWord[];
}

export interface TranscriptionResult {
  language: string;
  rawText: string;
  segments: TranscriptSegmentData[];
  speakers: Array<{ label: string; name: string; speakerIndex: number }>;
}

export interface ClipScoreBreakdown {
  overallScore: number; // 0 - 100
  hookStrength: number; // 0 - 100
  engagementPotential: number; // 0 - 100
  clarity: number; // 0 - 100
  emotionalImpact: number; // 0 - 100
  storyCompleteness: number; // 0 - 100
  reasoning: string;
}

export interface DetectedMoment {
  startTime: number;
  endTime: number;
  duration: number;
  title: string;
  hook: string;
  description: string;
  hashtags: string[];
  score: ClipScoreBreakdown;
}

export interface ClipDetectionOptions {
  minDurationSeconds?: number;
  maxDurationSeconds?: number;
  targetClipCount?: number;
  topicFocus?: string;
}

export interface ITranscriptionProvider {
  transcribeAudio(audioBuffer: Buffer, fileName: string): Promise<TranscriptionResult>;
}

export interface IClipDetectorProvider {
  detectMoments(
    transcript: TranscriptionResult,
    options?: ClipDetectionOptions
  ): Promise<DetectedMoment[]>;
}

export interface IHookAndTitleProvider {
  generateHookAndTitle(segmentText: string): Promise<{
    title: string;
    hook: string;
    description: string;
    hashtags: string[];
  }>;
}

export interface ICaptionGeneratorProvider {
  generateCaptions(words: TranscriptWord[]): Promise<
    Array<{
      startTime: number;
      endTime: number;
      text: string;
      wordsJson: TranscriptWord[];
    }>
  >;
}

export interface IAIProviderService {
  transcription: ITranscriptionProvider;
  clipDetector: IClipDetectorProvider;
  hookTitle: IHookAndTitleProvider;
  captions: ICaptionGeneratorProvider;
}
