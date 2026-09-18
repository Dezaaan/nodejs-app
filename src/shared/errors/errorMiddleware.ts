import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Logger } from "../../infrastructure/createLogger.js";
import { AppError } from "./AppError.js";

export const createErrorMiddleware = (logger: Logger): ErrorRequestHandler => {
  return (error, request, response) => {
    if (error instanceof AppError) {
      response.status(error.statusCode).json({
        error: {
          code: error.code,
          message: error.message,
        },
      });

      return;
    }

    if (error instanceof ZodError) {
      response.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          details: error.flatten(),
          message: "Invalid request data",
        },
      });

      return;
    }

    logger.error("Unhandled application error", {
      error,
      method: request.method,
      path: request.originalUrl,
      requestId: response.locals.requestId,
    });

    response.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    });
  };
};
