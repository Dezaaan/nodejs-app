import type { PoolClient, QueryResult, QueryResultRow } from "pg";

export type Database = {
  query<T extends QueryResultRow>(
    text: string,
    params?: unknown[],
  ): Promise<QueryResult<T>>;

  connect(): Promise<PoolClient>;

  healthCheck(): Promise<void>;

  close(): Promise<void>;
};
