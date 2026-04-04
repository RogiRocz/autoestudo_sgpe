import { LoginRequest } from "@/types/auth/auth"
import { apiFetch } from "../shared/config"

const routeName = 'auth'

export const AuthService = {
    login: async (data: LoginRequest) => apiFetch<string>(`${routeName}/login/`, {
        method: 'POST',
        body: JSON.stringify(data)
    }),

    register: async (data: LoginRequest) => apiFetch<string>(`${routeName}/register/`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}