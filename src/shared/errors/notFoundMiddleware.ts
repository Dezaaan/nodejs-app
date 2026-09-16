// shared/errors/notFoundMiddleware.ts

import type { RequestHandler } from "express";

import { NotFoundError } from "./NotFoundError.js";

export const notFoundMiddleware: RequestHandler = (
  request,
  _response,
  next,
) => {
  next(
    new NotFoundError(
      `Route ${request.method} ${request.originalUrl} not found`,
    ),
  );
};
