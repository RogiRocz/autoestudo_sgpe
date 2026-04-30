import { PaginationResponse, QueryParams } from '@/types/shared/pagination'
import { apiFetch } from './config'
import { createParams } from './params'

export const createBaseService = <T, UpdateDTO>(routeName: string) => {
	return {
		findAllPaginated: async (params: QueryParams) => {
			const formattedParams = createParams(params)
			return apiFetch<PaginationResponse<T>>(`${routeName}/${formattedParams}`, {
				method: 'GET',

			})
		},

		update: async (id: string, data: UpdateDTO) =>
			apiFetch<T>(`${routeName}/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(data),
			}),

		deactivate: async (id: string) =>
			apiFetch<void>(`${routeName}/desativar/${id}`, {
				method: 'PATCH',
			}),
	}
}
