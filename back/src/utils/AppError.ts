// src/utils/appError.ts

export class AppError extends Error {
  public readonly entity: "Room" | "VoiceEntry" | string;
  public readonly errorCode?: string;

  constructor(
    entity: "Room" | "VoiceEntry" | string,
    message: string,
    errorCode?: string,
  ) {
    super(message);
    this.name = "AppError";
    this.entity = entity;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
