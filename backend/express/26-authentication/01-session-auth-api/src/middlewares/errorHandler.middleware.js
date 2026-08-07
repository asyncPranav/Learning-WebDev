const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "fail",
    statusCode,
    message,
    ...(err.errors?.length && { errors: err.errors }), // understand this line, it conditionally adds the errors property if it exists and has length
  });
};

export default errorHandler;