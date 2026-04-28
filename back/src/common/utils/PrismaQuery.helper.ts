import { PaginatedResponse } from '../dto/PaginatedResponse.dto'
import { QueryParamsDTO } from '../dto/QueryParams.dto'

export function getPaginationPrisma(params: QueryParamsDTO) {
    return {
        skip: params.size * (params.page - 1),
        take: params.size,
        orderBy: {
            [params.sortBy]: params.order,
        },
    }
}

export function createPagination<E>(
    data: E[],
    total: number,
    params: QueryParamsDTO
): PaginatedResponse<E> {
    return {
        metadata: {
            page: params.page,
            size: params.size,
            totalPages: Math.ceil(total / params.size),
            totalItems: total,
        },
        data: data,
    }
}
