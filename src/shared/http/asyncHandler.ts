// shared/http/asyncHandler.ts

import type {
  NextFunction,
  ParamsDictionary,
  Request,
  RequestHandler,
  Response,
} from "express-serve-static-core";
import type { ParsedQs } from "qs";

type AsyncRequestHandler<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = ParsedQs,
> = (
  request: Request<P, ResBody, ReqBody, ReqQuery>,
  response: Response<ResBody>,
  next: NextFunction,
) => Promise<void>;

export const asyncHandler = <
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = ParsedQs,
>(
  handler: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (request, response, next) => {
    void handler(request, response, next).catch(next);
  };
};
