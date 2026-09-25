import {
  IAIProviderService,
  ITranscriptionProvider,
  IClipDetectorProvider,
  IHookAndTitleProvider,
  ICaptionGeneratorProvider,
  TranscriptionResult,
  DetectedMoment,
  ClipDetectionOptions,
  TranscriptWord,
} from "../ai.interface";
import { logger } from "@/lib/logger";

export class MockTranscriptionProvider implements ITranscriptionProvider {
  async transcribeAudio(_audioBuffer: Buffer, fileName: string): Promise<TranscriptionResult> {
    logger.info(`[MOCK] Transcribing audio file: ${fileName}`, "MockTranscription");

    return {
      language: "en",
      rawText:
        "Welcome to the show everyone. Today we are talking about how modern creators can scale their audience with AI video clipping. The number one mistake people make is ignoring the first three seconds. If you hook them immediately with high emotional curiosity, your retention skyrockets through the roof.",
      speakers: [
        { label: "SPEAKER_00", name: "Host", speakerIndex: 0 },
        { label: "SPEAKER_01", name: "Guest", speakerIndex: 1 },
      ],
      segments: [
        {
          startTime: 0.0,
          endTime: 4.5,
          speakerLabel: "SPEAKER_00",
          text: "Welcome to the show everyone. Today we are talking about how modern creators can scale their audience with AI video clipping.",
          words: [
            { word: "Welcome", start: 0.0, end: 0.5 },
            { word: "to", start: 0.5, end: 0.7 },
            { word: "the", start: 0.7, end: 0.9 },
            { word: "show", start: 0.9, end: 1.4 },
            { word: "everyone.", start: 1.4, end: 1.9 },
            { word: "Today", start: 2.1, end: 2.5 },
            { word: "we", start: 2.5, end: 2.7 },
            { word: "are", start: 2.7, end: 2.9 },
            { word: "talking", start: 2.9, end: 3.3 },
            { word: "about", start: 3.3, end: 3.6 },
            { word: "how", start: 3.6, end: 3.8 },
            { word: "modern", start: 3.8, end: 4.1 },
            { word: "creators", start: 4.1, end: 4.5 },
          ],
        },
        {
          startTime: 4.6,
          endTime: 12.0,
          speakerLabel: "SPEAKER_01",
          text: "The number one mistake people make is ignoring the first three seconds. If you hook them immediately with high emotional curiosity, your retention skyrockets through the roof.",
          words: [
            { word: "The", start: 4.6, end: 4.8 },
            { word: "number", start: 4.8, end: 5.1 },
            { word: "one", start: 5.1, end: 5.4 },
            { word: "mistake", start: 5.4, end: 6.0 },
            { word: "people", start: 6.0, end: 6.3 },
            { word: "make", start: 6.3, end: 6.7 },
            { word: "is", start: 6.7, end: 6.9 },
            { word: "ignoring", start: 6.9, end: 7.4 },
            { word: "the", start: 7.4, end: 7.6 },
            { word: "first", start: 7.6, end: 8.0 },
            { word: "three", start: 8.0, end: 8.4 },
            { word: "seconds.", start: 8.4, end: 8.9 },
            { word: "If", start: 9.1, end: 9.3 },
            { word: "you", start: 9.3, end: 9.5 },
            { word: "hook", start: 9.5, end: 9.9 },
            { word: "them", start: 9.9, end: 10.1 },
            { word: "immediately", start: 10.1, end: 10.7 },
            { word: "with", start: 10.7, end: 10.9 },
            { word: "high", start: 10.9, end: 11.2 },
            { word: "emotional", start: 11.2, end: 11.6 },
            { word: "curiosity,", start: 11.6, end: 12.0 },
          ],
        },
      ],
    };
  }
}

export class MockClipDetectorProvider implements IClipDetectorProvider {
  async detectMoments(
    _transcript: TranscriptionResult,
    options?: ClipDetectionOptions
  ): Promise<DetectedMoment[]> {
    logger.info("[MOCK] Detecting high-potential viral moments", "MockClipDetector", options);

    return [
      {
        startTime: 4.6,
        endTime: 12.0,
        duration: 7.4,
        title: "The #1 Video Retention Mistake (First 3 Seconds Rule)",
        hook: "Stop ignoring the first 3 seconds of your videos.",
        description: "Why the opening 3 seconds dictate 90% of your audience retention and how to fix it.",
        hashtags: ["#contentcreator", "#videoediting", "#viraltips", "#audiencegrowth"],
        score: {
          overallScore: 94,
          hookStrength: 96,
          engagementPotential: 92,
          clarity: 95,
          emotionalImpact: 90,
          storyCompleteness: 94,
          reasoning:
            "Direct contradiction of common creator practice in the opening sentence creates high psychological curiosity gap.",
        },
      },
      {
        startTime: 0.0,
        endTime: 4.5,
        duration: 4.5,
        title: "How Top Creators Scale Content Effortlessly",
        hook: "Here is the blueprint to 10x your video output without burning out.",
        description: "An actionable overview of AI video clipping workflows for modern media teams.",
        hashtags: ["#saas", "#aitools", "#creatoreconomy", "#productivity"],
        score: {
          overallScore: 82,
          hookStrength: 80,
          engagementPotential: 85,
          clarity: 88,
          emotionalImpact: 76,
          storyCompleteness: 81,
          reasoning: "Solid introductory premise with clear value proposition for creator productivity.",
        },
      },
    ];
  }
}

export class MockHookAndTitleProvider implements IHookAndTitleProvider {
  async generateHookAndTitle(segmentText: string): Promise<{
    title: string;
    hook: string;
    description: string;
    hashtags: string[];
  }> {
    logger.info("[MOCK] Generating hook, title and metadata", "MockHookTitle");

    return {
      title: "The Secret to Viral Video Hooks",
      hook: "If you don't do this in the first 3 seconds, your video will fail.",
      description: `Analyzing: "${segmentText.slice(0, 50)}..." with AI-optimized engagement patterns.`,
      hashtags: ["#contentstrategy", "#videomarketing", "#shorts", "#reels"],
    };
  }
}

export class MockCaptionGeneratorProvider implements ICaptionGeneratorProvider {
  async generateCaptions(words: TranscriptWord[]): Promise<
    Array<{
      startTime: number;
      endTime: number;
      text: string;
      wordsJson: TranscriptWord[];
    }>
  > {
    logger.info(`[MOCK] Generating subtitle caption chunks for ${words.length} words`, "MockCaption");

    const chunks: Array<{
      startTime: number;
      endTime: number;
      text: string;
      wordsJson: TranscriptWord[];
    }> = [];

    const chunkSize = 4;
    for (let i = 0; i < words.length; i += chunkSize) {
      const slice = words.slice(i, i + chunkSize);
      if (slice.length > 0) {
        chunks.push({
          startTime: slice[0].start,
          endTime: slice[slice.length - 1].end,
          text: slice.map((w) => w.word).join(" "),
          wordsJson: slice,
        });
      }
    }

    return chunks;
  }
}

export class MockAIService implements IAIProviderService {
  public transcription = new MockTranscriptionProvider();
  public clipDetector = new MockClipDetectorProvider();
  public hookTitle = new MockHookAndTitleProvider();
  public captions = new MockCaptionGeneratorProvider();
}
