import { AnyUser } from "@/types/shared/user.interface"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  token: string | null
  user: AnyUser | null
  setToken: (newToken: string) => void
  setUser: (newUser: AnyUser) => void
  setAuth: (token: string, user: AnyUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setToken: (newToken: string) => set(() => ({ token: newToken })),
      setUser: (newUser: AnyUser) => set(() => ({ user: newUser })),
      setAuth: (token, user) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth-storage" }
  )
)
