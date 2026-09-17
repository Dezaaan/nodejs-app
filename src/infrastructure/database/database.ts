import { Pool } from "pg";

import type { AppConfig } from "../../config/config.js";
import type { Database } from "./database.types.js";

export const createDatabase = (config: AppConfig["database"]): Database => {
  const pool = new Pool({
    connectionString: config.url,
  });

  return {
    query: (text, params) => pool.query(text, params),

    connect: () => pool.connect(),

    healthCheck: async () => {
      await pool.query("SELECT 1");
    },

    close: () => pool.end(),
  };
};
