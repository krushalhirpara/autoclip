import { IAIProviderService } from "./ai.interface";
import { MockAIService } from "./providers/mock-ai.provider";
import { OpenAIService } from "./providers/openai-ai.provider";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

let aiServiceInstance: IAIProviderService | null = null;

export function getAIService(): IAIProviderService {
  if (aiServiceInstance) {
    return aiServiceInstance;
  }

  if (env.AI_PROVIDER === "openai" && env.OPENAI_API_KEY) {
    logger.info("Initializing OpenAIService (Whisper + GPT-4o)", "AIFactory");
    aiServiceInstance = new OpenAIService();
  } else {
    logger.info("Initializing MockAIService for development without API keys", "AIFactory");
    aiServiceInstance = new MockAIService();
  }

  return aiServiceInstance;
}

export * from "./ai.interface";
