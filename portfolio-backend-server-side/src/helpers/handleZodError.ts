import { ZodError, ZodIssue } from 'zod';

const handleZodError = (err: ZodError) => {
    const errorSources: { path: string; message: string }[] = [];
    err.issues.forEach((issue: ZodIssue) => {
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

export default handleZodError;
