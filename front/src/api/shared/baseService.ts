import { apiFetch } from "./config";

export const createBaseService = <T, UpdateDTO>(routeName: string) => {
    return {
        update: async (id: string, data: UpdateDTO) =>
            apiFetch<T>(`${routeName}/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),

        deactivate: async (id: string) =>
            apiFetch<void>(`${routeName}/desativar/${id}`, {
                method: "PATCH"
            }),
    };
};