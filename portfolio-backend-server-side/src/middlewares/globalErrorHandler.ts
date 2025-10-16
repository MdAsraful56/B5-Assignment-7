import { NextFunction, Request, Response } from 'express';
import { envVars } from '../config/env';
import AppError from '../error/AppError';
import handleCastError from '../helpers/handleCastError';
import handlerDuplicateError from '../helpers/handlerDuplicateError';
import handleValidationError from '../helpers/handleValidationError';
import handleZodError from '../helpers/handleZodError';

export const globalErrorHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    let statusCode = 500;
    let message = `Something went wrong: ${err.message}`;

    const errorSources: { path: string; message: string }[] = [
        // {
        //     path: 'isDeleted',
        //     message: 'Cast Failed',
        // },
    ];

    //duplicate error
    if (err.code === 11000) {
        const simplifiedError = handlerDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }

    // Object Id Cast error
    else if (err.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }

    // Zod validation error
    else if (err.name === 'ZodError') {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources.push(...(simplifiedError.errorSources || []));
    }

    // validation error
    else if (err.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        errorSources.push(...(simplifiedError.errorSources || []));
        message = simplifiedError.message;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === 'development' ? err : null,
        stack: envVars.NODE_ENV === 'development' ? err.stack : null,
    });
};
