import type { Env } from "./env.js";

export type AppConfig = {
  app: {
    environment: Env["NODE_ENV"];
    port: number;
  };
};

export const createConfig = (env: Env): AppConfig => ({
  app: {
    environment: env.NODE_ENV,
    port: env.PORT,
  },
});
