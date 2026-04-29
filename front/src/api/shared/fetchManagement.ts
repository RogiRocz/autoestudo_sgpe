import { useAppCache } from '@/store/cache.store'
import { PaginationResponse } from '@/types/shared/pagination'
import { apiFetch } from './config'

export const fetchManagement = async <T>(
    key: string,
    params: string
): Promise<PaginationResponse<T>> => {
    const cache = useAppCache.getState()

    const cachedData = cache.get<PaginationResponse<T>>(key, params)
    if (cachedData) return cachedData

    const url = `${key}${params}`
    const response = await apiFetch<PaginationResponse<T>>(url)

    cache.save(key, params, response)
    return response
}
