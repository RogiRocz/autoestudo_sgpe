import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../../api/auth/auth.api"
import { RegisterUser } from "@/types/auth/auth"

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["users", "create"],
    mutationFn: async ({ type, userData }: RegisterUser) => {
      return await AuthService.register({ type, userData })
    },
  })
}
