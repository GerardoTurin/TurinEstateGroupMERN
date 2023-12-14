const errorHandlers = (status, message) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

export default errorHandlers;