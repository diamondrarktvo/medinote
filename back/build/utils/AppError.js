"use strict";
// src/utils/appError.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(entity, message, errorCode) {
        super(message);
        this.name = "AppError";
        this.entity = entity;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
