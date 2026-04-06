import { useAuthStore } from "@/store/auth.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3000';

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const authStore = useAuthStore
    const token = authStore((state) => state.token)

    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 204) {
        return {} as T;
    }

    const newToken = response.headers.get('Authorization');
    if (newToken && typeof window !== 'undefined') {
        const tokenValue = newToken.split(' ')[1];
        authStore((state) => state.setToken(tokenValue))
    }

    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            authStore(state => state.logout())
            window.location.href = '/auth/login';
        }
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro na requisição');
    }

    return response.json();
}