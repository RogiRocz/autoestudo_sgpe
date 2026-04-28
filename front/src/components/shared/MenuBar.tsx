"use client"

import { MENU_ITENS } from "@/utils/menuItens"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import Link from "next/link"
import { Button } from "../ui/button"

export function MenuBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {MENU_ITENS.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={item.href}>
                <Button>
                  {<item.icon />}
                  {item.label}
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
