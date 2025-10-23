"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    return {
        statusCode: 400,
        message: `Invalid ${err.path}: ${err.value}. Please provide a valid ${err.path}.`,
    };
};
exports.default = handleCastError;
