export type WithPaginationResponse<T> = {
  items: T[]
  page?: number
  pageSize: number
  pagesCount?: number
  totalCount: number
}
export type WithSortPaginationParams = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type WithSearchPaginationParams = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}
export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
