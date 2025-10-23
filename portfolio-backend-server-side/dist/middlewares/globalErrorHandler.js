"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../error/AppError"));
const handleCastError_1 = __importDefault(require("../helpers/handleCastError"));
const handlerDuplicateError_1 = __importDefault(require("../helpers/handlerDuplicateError"));
const handleValidationError_1 = __importDefault(require("../helpers/handleValidationError"));
const handleZodError_1 = __importDefault(require("../helpers/handleZodError"));
const globalErrorHandler = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let statusCode = 500;
    let message = `Something went wrong: ${err.message}`;
    const errorSources = [
    // {
    //     path: 'isDeleted',
    //     message: 'Cast Failed',
    // },
    ];
    //duplicate error
    if (err.code === 11000) {
        const simplifiedError = (0, handlerDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Object Id Cast error
    else if (err.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Zod validation error
    else if (err.name === 'ZodError') {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources.push(...(simplifiedError.errorSources || []));
    }
    // validation error
    else if (err.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        errorSources.push(...(simplifiedError.errorSources || []));
        message = simplifiedError.message;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: env_1.envVars.NODE_ENV === 'development' ? err : null,
        stack: env_1.envVars.NODE_ENV === 'development' ? err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
