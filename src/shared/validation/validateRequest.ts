import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodType } from "zod";

type RequestSchemas = {
  params?: ZodType;
  query?: ZodType;
  body?: ZodType;
};

export const validateRequest = (schemas: RequestSchemas): RequestHandler => {
  return (request: Request, _response: Response, next: NextFunction): void => {
    request.validated = {
      params: schemas.params ? schemas.params.parse(request.params) : undefined,
      query: schemas.query ? schemas.query.parse(request.query) : undefined,
      body: schemas.body ? schemas.body.parse(request.body) : undefined,
    };

    next();
  };
};
