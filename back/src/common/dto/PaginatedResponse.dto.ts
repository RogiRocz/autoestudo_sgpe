export class PaginatedResponse<E> {
    metadata: {
        page: number,
        size: number,
        totalPages: number,
        totalItems: number
    };
    data: E[];
}