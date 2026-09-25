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
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export class OpenAITranscriptionProvider implements ITranscriptionProvider {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = env.OPENAI_API_KEY || "";
    this.model = env.OPENAI_WHISPER_MODEL || "whisper-1";
  }

  async transcribeAudio(audioBuffer: Buffer, fileName: string): Promise<TranscriptionResult> {
    if (!this.apiKey) {
      throw new Error("OPENAI_API_KEY is not configured in environment variables");
    }

    logger.info(`Sending audio to OpenAI Whisper API: ${fileName}`, "OpenAITranscription");

    const formData = new FormData();
    const blob = new Blob([new Uint8Array(audioBuffer)], { type: "audio/mp3" });
    formData.append("file", blob, fileName);
    formData.append("model", this.model);
    formData.append("response_format", "verbose_json");
    formData.append("timestamp_granularities[]", "word");
    formData.append("timestamp_granularities[]", "segment");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI transcription failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    const segments = (data.segments || []).map((seg: { start: number; end: number; text: string; words?: Array<{ word: string; start: number; end: number }> }) => ({
      startTime: seg.start,
      endTime: seg.end,
      text: seg.text.trim(),
      speakerLabel: "SPEAKER_00",
      words: (seg.words || []).map((w: { word: string; start: number; end: number }) => ({
        word: w.word,
        start: w.start,
        end: w.end,
      })),
    }));

    return {
      language: data.language || "en",
      rawText: data.text,
      segments,
      speakers: [{ label: "SPEAKER_00", name: "Primary Speaker", speakerIndex: 0 }],
    };
  }
}

export class OpenAIClipDetectorProvider implements IClipDetectorProvider {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = env.OPENAI_API_KEY || "";
    this.model = env.OPENAI_MODEL || "gpt-4o";
  }

  async detectMoments(
    transcript: TranscriptionResult,
    options?: ClipDetectionOptions
  ): Promise<DetectedMoment[]> {
    if (!this.apiKey) {
      throw new Error("OPENAI_API_KEY is not configured in environment variables");
    }

    logger.info("Sending transcript to OpenAI GPT for viral moment detection", "OpenAIClipDetector");

    const systemPrompt = `You are an elite short-form video editor and algorithm specialist (OpusClip / Gling level).
Analyze the provided video transcript with timestamps.
Identify the highest-potential short-form vertical moments (typically 15-60 seconds long).
For each moment, extract:
1. Exact startTime and endTime in seconds.
2. An irresistible viral Title (under 60 chars).
3. A gripping Hook opening line.
4. An engaging caption/description with 3-5 trending hashtags.
5. A rigorous multi-factor score (0-100) evaluating:
   - hookStrength
   - engagementPotential
   - clarity
   - emotionalImpact
   - storyCompleteness
   - overallScore (weighted average)
   - concise reasoning.

Return ONLY a valid JSON array of objects adhering to this schema.`;

    const userPrompt = `Target clip count: ${options?.targetClipCount || 5}.
Transcript:
${JSON.stringify(transcript.segments.map((s) => ({ start: s.startTime, end: s.endTime, text: s.text })))}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI moment detection failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    const moments: DetectedMoment[] = (content.moments || content.clips || content).map(
      (m: DetectedMoment) => ({
        ...m,
        duration: Number((m.endTime - m.startTime).toFixed(2)),
      })
    );

    return moments;
  }
}

export class OpenAIHookAndTitleProvider implements IHookAndTitleProvider {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = env.OPENAI_API_KEY || "";
    this.model = env.OPENAI_MODEL || "gpt-4o";
  }

  async generateHookAndTitle(segmentText: string): Promise<{
    title: string;
    hook: string;
    description: string;
    hashtags: string[];
  }> {
    if (!this.apiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: "system",
            content:
              "Generate high-CTR title, hook line, description and 4 hashtags for this video clip. Output JSON: {title, hook, description, hashtags}",
          },
          { role: "user", content: segmentText },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }
}

export class OpenAICaptionGeneratorProvider implements ICaptionGeneratorProvider {
  async generateCaptions(words: TranscriptWord[]): Promise<
    Array<{
      startTime: number;
      endTime: number;
      text: string;
      wordsJson: TranscriptWord[];
    }>
  > {
    const chunks: Array<{
      startTime: number;
      endTime: number;
      text: string;
      wordsJson: TranscriptWord[];
    }> = [];

    const wordsPerSubtitle = 4;
    for (let i = 0; i < words.length; i += wordsPerSubtitle) {
      const slice = words.slice(i, i + wordsPerSubtitle);
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

export class OpenAIService implements IAIProviderService {
  public transcription = new OpenAITranscriptionProvider();
  public clipDetector = new OpenAIClipDetectorProvider();
  public hookTitle = new OpenAIHookAndTitleProvider();
  public captions = new OpenAICaptionGeneratorProvider();
}
