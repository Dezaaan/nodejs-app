import express from "express";
import type { AppContainer } from "./app/container.types.js";
import { createRoutes } from "./routes/createRoutes.js";
import { notFoundMiddleware } from "./shared/errors/notFoundMiddleware.js";
import { createErrorMiddleware } from "./shared/errors/errorMiddleware.js";

export const createApp = (container: AppContainer) => {
  const app = express();

  app.use((request, response, next) => {
    console.log("Incoming request:", request.method, request.url);
    next();
  });

  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({
      status: "ok",
    });
  });

  app.use("/api", createRoutes(container));

  app.use(notFoundMiddleware);
  app.use(createErrorMiddleware(container.infrastructure.logger));

  return app;
};
