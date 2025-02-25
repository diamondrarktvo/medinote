"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
        this.statusCode = 500;
    }
}
exports.InternalServerError = InternalServerError;
