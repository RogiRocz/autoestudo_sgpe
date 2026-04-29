import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../../api/auth/auth.api'
import { LoginRequest, RegisterUser } from '@/types/auth/auth'

export const useRegisterUser = () => {
    return useMutation({
        mutationKey: ['users', 'register'],
        mutationFn: async ({ type, userData }: RegisterUser) => {
            return await AuthService.register({ type, userData })
        },
    })
}

export const useLoginUser = () => {
    return useMutation({
        mutationKey: ['users', 'login'],
        mutationFn: async ({ login, senha, field, type }: LoginRequest) => {
            return await AuthService.login({ login, senha, field, type })
        },
    })
}
