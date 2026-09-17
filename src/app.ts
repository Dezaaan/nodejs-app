import cors from "cors";
import express from "express";
import helmet from "helmet";
import type { AppContainer } from "./app/container.types.js";
import { createErrorMiddleware } from "./shared/errors/errorMiddleware.js";
import { createRoutes } from "./routes/createRoutes.js";
import { notFoundMiddleware } from "./shared/errors/notFoundMiddleware.js";

export const createApp = (container: AppContainer) => {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin: container.config.cors.origin,
    }),
  );

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
