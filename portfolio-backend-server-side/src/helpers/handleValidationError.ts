import mongoose from 'mongoose';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const errorSources: { path: string; message: string }[] = [];

    const errors = Object.values(err.errors);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors.forEach((errorObject: any) =>
        errorSources.push({
            path: errorObject.path,
            message: errorObject.message,
        })
    );

    return {
        statusCode: 400,
        message: 'Validation error occurred. Please check your input.',
        errorSources,
    };
};

export default handleValidationError;
