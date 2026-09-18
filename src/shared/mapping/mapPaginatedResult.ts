import type { PaginatedResult } from "../pagination/pagination.types.js";

export const mapPaginatedResult = <TSource, TTarget>(
  result: PaginatedResult<TSource>,
  mapper: (item: TSource) => TTarget,
): PaginatedResult<TTarget> => ({
  items: result.items.map(mapper),
  pagination: result.pagination,
});
