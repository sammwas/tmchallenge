export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
