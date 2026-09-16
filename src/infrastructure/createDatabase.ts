export type Database = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export const createDatabase = (database: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}): Database => {
  return {
    connect: async () => {
      // TODO: implement database connection
      console.log("[LOG]", database);
    },
    disconnect: async () => {
      // TODO: implement database disconnection
      console.log("[LOG]", database);
    },
  };
};
