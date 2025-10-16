import mongoose from 'mongoose';

const handleCastError = (err: mongoose.Error.CastError) => {
    return {
        statusCode: 400,
        message: `Invalid ${err.path}: ${err.value}. Please provide a valid ${err.path}.`,
    };
};

export default handleCastError;
