const handleCastError = (err: { path: any; value: any }) => {
    return {
        statusCode: 400,
        message: `Invalid ${err.path}: ${err.value}. Please provide a valid ${err.path}.`,
    };
};

export default handleCastError;
