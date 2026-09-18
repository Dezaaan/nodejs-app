import type { Request } from "express";

export const getValidatedQuery = <T>(request: Request): T => {
  return request.validated?.query as T;
};

export const getValidatedParams = <T>(request: Request): T => {
  return request.validated?.params as T;
};

export const getValidatedBody = <T>(request: Request): T => {
  return request.validated?.body as T;
};
