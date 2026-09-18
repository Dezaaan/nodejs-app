import type { ValidatedRequestData } from "../validation/validatedRequest.types.ts";

declare module "express-serve-static-core" {
  interface Request {
    validated?: ValidatedRequestData;
  }
}
