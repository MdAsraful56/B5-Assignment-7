// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlerDuplicateError = (err: any) => {
    const matchedArray = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArray[1]} already exists`,
    };
};

export default handlerDuplicateError;
