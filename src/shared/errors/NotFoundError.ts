import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super({
      statusCode: 404,
      code: "NOT_FOUND",
      message,
    });

    this.name = "NotFoundError";
  }
}
