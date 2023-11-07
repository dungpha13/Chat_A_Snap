export const errorHandler = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
};

// export default errorHandler;