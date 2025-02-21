"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.name === "AppError") {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        return; // retourne undefined, conforme au type void
    }
    res.status(500).json({
        success: false,
        message: "Une erreur interne est survenue.",
    });
};
exports.errorHandler = errorHandler;
