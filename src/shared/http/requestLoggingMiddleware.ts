import type { RequestHandler } from "express";
import { Logger } from "../../infrastructure/createLogger.js";

export const createRequestLoggingMiddleware = (
  logger: Logger,
): RequestHandler => {
  return (request, response, next) => {
    const startedAt = Date.now();

    response.on("finish", () => {
      logger.info("HTTP request completed", {
        requestId: response.locals.requestId,
        method: request.method,
        path: request.originalUrl,
        statusCode: response.statusCode,
        durationMs: Date.now() - startedAt,
      });
    });

    next();
  };
};
