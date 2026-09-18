import type { PaginatedResult, PaginationOptions } from "./pagination.types.js";

type CreatePaginatedResultOptions<T> = {
  items: T[];
  totalItems: number;
  pagination: PaginationOptions;
};

export const createPaginatedResult = <T>({
  items,
  totalItems,
  pagination,
}: CreatePaginatedResultOptions<T>): PaginatedResult<T> => {
  const totalPages = Math.ceil(totalItems / pagination.pageSize);

  return {
    items,

    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalItems,
      totalPages,
    },
  };
};
