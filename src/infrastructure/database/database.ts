import { Pool } from "pg";

import type { AppConfig } from "../../config/config.js";
import type { Database } from "./database.types.js";

export const createDatabase = (config: AppConfig["database"]): Database => {
  const pool = new Pool({
    host: config.host,
    port: config.port,
    database: config.name,
    user: config.user,
    password: config.password,
  });

  return {
    query: (text, params) => pool.query(text, params),

    connect: () => pool.connect(),

    close: () => pool.end(),
  };
};
