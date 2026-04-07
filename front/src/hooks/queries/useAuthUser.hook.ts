import { useAuthStore } from "@/store/auth.store"

export const useAuthUser = () => {
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = !!user?.uuid && !!user?.type

    return { user, isAuthenticated }
}