import { useAuthStore } from '@/store/auth.store'
import { AnyUser } from '@/types/shared/user.interface'
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3000'

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const authStore = useAuthStore.getState()
    const token = getCookie('token')

    const headers = new Headers(options.headers)
    headers.set('Content-Type', 'application/json')

    if (token) {
        headers.set('Authorization', `Bearer ${token}`)
    }

    const config: RequestInit = {
        ...options,
        headers,
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, config)
    const data = await response.json()

    if (response.status === 204) {
        return {} as T
    }

    const newToken = response.headers.get('Authorization')
    if (newToken && typeof window !== 'undefined') {
        const tokenValue = newToken.split(' ')[1]
        authStore.setAuth(tokenValue, data.user as AnyUser)
        setCookie('token', tokenValue)
    }

    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            deleteCookie('token')
            authStore.logout()
            window.location.href = '/login'
        }
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Erro na requisição')
    }

    return data
}
