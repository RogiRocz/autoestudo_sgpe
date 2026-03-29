import { QueryParamsDTO } from "../dto/QueryParams.dto";

export function getPaginationPrisma(params: QueryParamsDTO) {
    return {
        skip: params.size * (params.page - 1),
        take: params.size,
        orderBy: {
            [params.sortBy]: params.order
        }
    }
}