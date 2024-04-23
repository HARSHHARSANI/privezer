export const TryCatch = (passedFunction) => async (req, res, next) => {
  try {
    await passedFunction(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    err.message = "Duplicate Field Value Enter";
    err.statusCode = 400;
  } else if (err.name === "CastError") {
    err.message = `Resource not found. Invalid: ${err.path}`;
    err.statusCode = 404;
  } else if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    err.message = message;
    err.statusCode = 400;
  } else if (err.name === "JsonWebTokenError") {
    err.message = "Json Web Token is invalid. Try Again!!!";
    err.statusCode = 400;
  } else if (err.name === "TokenExpiredError") {
    err.message = "Json Web Token is expired. Try Again!!!";
    err.statusCode = 400;
  }

  return res.status(err.statusCode).json({
    success: false,
    message: process.env.NODE_ENV === "DEVELOPMENT" ? err : err.message,
  });
};
