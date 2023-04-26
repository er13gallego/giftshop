export interface PaginatedResult<T> {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
  items: T[];
}
