"use client"

import { Button } from "../ui/button"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { deleteCookie } from "cookies-next/client"

export function LogoutButton() {
  const { logout } = useAuthStore()
  const router = useRouter()
  const handleLogout = () => {
    deleteCookie("token")
    logout()
    router.replace("/login")
    router.refresh()
  }

  return (
    <Button variant="outline" size="icon" onClick={handleLogout}>
      <LogoutIcon></LogoutIcon>
    </Button>
  )
}
