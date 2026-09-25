export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  message: string;
  context?: string;
  data?: Record<string, unknown> | Error | unknown;
}

class Logger {
  private levelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  private currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "debug";

  private shouldLog(level: LogLevel): boolean {
    return this.levelPriority[level] >= this.levelPriority[this.currentLevel];
  }

  private formatMessage(level: LogLevel, { message, context, data }: LogPayload) {
    const timestamp = new Date().toISOString();
    const tag = context ? `[${context}]` : "[AutoClipp]";
    const prefix = `[${timestamp}] ${level.toUpperCase().padEnd(5)} ${tag}`;

    if (data !== undefined) {
      if (data instanceof Error) {
        return `${prefix} ${message}\n  Stack: ${data.stack}`;
      }
      return `${prefix} ${message} ${JSON.stringify(data)}`;
    }
    return `${prefix} ${message}`;
  }

  debug(message: string, context?: string, data?: unknown) {
    if (this.shouldLog("debug")) {
      console.debug(this.formatMessage("debug", { message, context, data }));
    }
  }

  info(message: string, context?: string, data?: unknown) {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", { message, context, data }));
    }
  }

  warn(message: string, context?: string, data?: unknown) {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", { message, context, data }));
    }
  }

  error(message: string, context?: string, data?: unknown) {
    if (this.shouldLog("error")) {
      console.error(this.formatMessage("error", { message, context, data }));
    }
  }
}

export const logger = new Logger();
