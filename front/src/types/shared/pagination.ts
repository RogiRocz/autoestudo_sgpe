interface PaginationMetadata {
    page: number
    size: number
    totalPages: number
    totalItems: number
}

export interface PaginationResponse<E> {
    metadata: PaginationMetadata
    data: E[]
}

export interface QueryParams {
    page: number
    size: number
    orderBy: string
    order: 'asc' | 'desc'
}
