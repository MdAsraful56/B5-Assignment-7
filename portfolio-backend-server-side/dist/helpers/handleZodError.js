"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorSources = [];
    err.issues.forEach((issue) => {
        errorSources.push({
            path: String(issue.path[issue.path.length - 1]), // Get the last part of the path
            message: issue.message,
        });
    });
    return {
        statusCode: 400,
        message: 'Zod Validation error occurred. Please check your input.',
        errorSources,
    };
};
exports.default = handleZodError;
