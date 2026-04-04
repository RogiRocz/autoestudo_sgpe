import { AnyUser} from "@/types/shared/user.interface"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
    token: string | null
    user: AnyUser | null
    setAuth: (token: string, user: AnyUser) => void
    logout: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (token, user) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        { name: 'auth-storage' }
    )
);