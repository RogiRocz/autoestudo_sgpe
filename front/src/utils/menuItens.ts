import HomeIcon from "@mui/icons-material/Home"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import PersonIcon from "@mui/icons-material/Person"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material/SvgIcon"

interface IMENU_ITENS {
  label: string
  href: string
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export const MENU_ITENS = <IMENU_ITENS[]>[
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Prontuarios", href: "/prontuarios", icon: RecentActorsIcon },
  { label: "Perfil", href: "/profile", icon: PersonIcon },
]
