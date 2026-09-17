import { AppConfig, createConfig } from "../../config/config.js";
import { createEnv } from "../../config/env.js";

export const createTestConfig = (): AppConfig => {
  const env = createEnv();
  const config = createConfig(env);

  if (config.app.environment !== "test") {
    throw new Error("Tests must run with NODE_ENV=test");
  }

  return config;
};
