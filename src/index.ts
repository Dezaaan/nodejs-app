import { createContainer } from "./app/container.js";
import { createApp } from "./app.js";
import { createConfig } from "./config/config.js";
import { createEnv } from "./config/env.js";

const start = async (): Promise<void> => {
  const env = createEnv();
  const config = createConfig(env);

  const container = createContainer(config);

  await container.infrastructure.database.healthCheck();

  const app = createApp(container);

  const server = app.listen(config.app.port, () => {
    container.infrastructure.logger.info(
      `Server running on http://localhost:${config.app.port}`,
    );
  });

  const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
    container.infrastructure.logger.info(
      `Received ${signal}. Shutting down...`,
    );

    server.close(async () => {
      await container.infrastructure.database.close();

      container.infrastructure.logger.info("Application stopped");

      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
};

void start();
