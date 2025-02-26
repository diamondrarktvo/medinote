"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../utils/CustomError");
const errorHandler = (err, req, res, next) => {
    if (err.name === "AppError") {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        return;
    }
    if (err instanceof CustomError_1.BadRequestError) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        return;
    }
    if (err instanceof CustomError_1.NotFoundError) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
        return;
    }
    if (err instanceof CustomError_1.InternalServerError) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
        return;
    }
    res.status(500).json({
        success: false,
        message: "Une erreur interne est survenue.",
    });
};
exports.errorHandler = errorHandler;
