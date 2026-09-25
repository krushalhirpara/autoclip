export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string;

  constructor(message: string, statusCode = 500, code = "INTERNAL_SERVER_ERROR", isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource", id?: string) {
    const message = id ? `${resource} with id '${id}' was not found` : `${resource} was not found`;
    super(message, 404, "NOT_FOUND");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required to access this resource") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to access this resource") {
    super(message, 403, "FORBIDDEN");
  }
}

export class ValidationError extends AppError {
  public readonly errors?: unknown;

  constructor(message = "Validation failed", errors?: unknown) {
    super(message, 400, "VALIDATION_ERROR");
    this.errors = errors;
  }
}

export class InsufficientCreditsError extends AppError {
  constructor(required: number, available: number) {
    super(
      `Insufficient credits. Required: ${required}, Available: ${available}. Please purchase more credits.`,
      402,
      "INSUFFICIENT_CREDITS"
    );
  }
}

export class VideoProcessingError extends AppError {
  public readonly jobId?: string;

  constructor(message: string, jobId?: string) {
    super(`Video processing failed: ${message}`, 500, "VIDEO_PROCESSING_FAILED");
    this.jobId = jobId;
  }
}
