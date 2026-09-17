import type { Env } from "./env.js";

export type AppConfig = {
  app: {
    environment: Env["NODE_ENV"];
    port: number;
  };
  database: {
    url: string;
  };
  cors: {
    origin: string;
  };
};

export const createConfig = (env: Env): AppConfig => ({
  app: {
    environment: env.NODE_ENV,
    port: env.PORT,
  },
  database: {
    url: env.DATABASE_URL,
  },
  cors: {
    origin: env.CLIENT_ORIGIN,
  },
});
