import { QueryParams } from "@/types/shared/pagination";

export function generateParams(params?: Partial<QueryParams>): QueryParams {
    const defaultValues: QueryParams = {
        page: 1,
        size: 10,
        orderBy: 'atualizadoEm',
        order: 'asc'
    }

    return { ...defaultValues, ...params }
}