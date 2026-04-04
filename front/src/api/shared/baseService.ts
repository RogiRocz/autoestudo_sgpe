import { apiFetch } from "./config";

export const createBaseService = <T, UpdateDTO>(routeName: string) => {
    return {
        // getMe: async () => apiFetch<T>(`${routeName}/${uuid zustand}`),

        update: async (id: string, data: UpdateDTO) =>
            apiFetch<T>(`${routeName}/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),

        deactivate: async (id: string) =>
            apiFetch<void>(`${routeName}/${id}`, {
                method: "DELETE"
            }),
    };
};